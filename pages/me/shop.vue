<template>
  <div>


    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content"
               :is="story.content.component"></component>


    <div v-if="currentStep == 0">
      <br>
      <div>
        <span>
          Gutschein-Wert:
        </span>
        <select class="form-item" v-model="selectedProduct">
          <option value="719">10€</option>
          <option value="720">25€</option>
          <option value="721">50€</option>
          <option value="722">100€</option>
        </select>
      </div>

      <div>
        <span>
          Extras:
        </span>
        <select class="form-item" v-model="selectedExtra">
          <option value="733">E-mail - Gratis</option>
          <option value="734">Versand-Standard - 3€</option>
          <option value="735">Deluxe-Box - 25€</option>
        </select>
      </div>

      <button class="input-button-primary" v-on:click="nextStep()">Weiter</button>
    </div>

    <div v-if="currentStep == 1">
      <input type="radio" name="paymentMethod" value="1" v-model="paymentMethod">Kreditkarte<br>
      <span v-if="sepa_active">
            <input type="radio" name="paymentMethod" value="2"  v-model="paymentMethod">SEPA-Monatsrechnung<br>

      </span>


      <div>
        <h4>Rechnungsaddresse:</h4>

        <div class="form-item">
          <span class="label">Vorname</span>
          <input class="input-text" type="text" v-model="invoiceContact.firstname" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Nachname</span>
          <input class="input-text" type="text" v-model="invoiceContact.lastname" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Telefon</span>
          <input class="input-text" type="text" v-model="invoiceContact.phone" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Straße</span>
          <input class="input-text" type="text" v-model="invoiceContact.street" name=""/>
        </div>        <div class="form-item">
          <span class="label">Straße</span>
          <input class="input-text" type="text" v-model="invoiceContact.street_additional" name=""/>
        </div>
        <div class="form-item">
          <span class="label">PLZ</span>
          <input class="input-text" type="text" v-model="invoiceContact.zip" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Stadt</span>
          <input class="input-text" type="text" v-model="invoiceContact.city" name=""/>
        </div>
      </div>

      <button class="input-button-primary" v-on:click="nextStep()">Bestellung prüfen</button>
    </div>
    <div v-if="currentStep == 2">
      Bestätigung:
      <ul>
        <li>Gutschein {{getGiftCardValue(selectedProduct)}}€</li>
        <li>Extra: {{getExtra(selectedExtra)}}</li>
      </ul>


      <button class="input-button-primary" v-on:click="checkout()">Kostenpflichtig Bestellen</button>
    </div>
    <div v-if="currentStep == 3">
      Kauf abgeschlossen. Die Rechnung und deinen Gutschein erhältst du per Mail.
    </div>

    <div v-if="currentStep == 99">
      {{ error }}


    </div>


  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  middleware: 'authenticated',
  mixins: [storyblokLivePreview],
  data() {
    return {
      currentStep: 0,
      selectedProduct: null,
      selectedExtra: null,
      paymentMethod: 0,
      error: '',
      shippingAddressEnabled: 0,
      invoiceContact: null,
      sepa_active: false,
      shippingAddress: []
    }
  },
  created() {
  },
  mounted() {
    this.$store.dispatch("getUserMetadata").then(data => {
      this.invoiceContact = data.data.invoice_contact;
      this.sepaActive = data.data.sepa_active;
    })
  },
  methods: {
    nextStep() {

      if(this.stepValid()){
        this.currentStep++;
      }
    },

    stepValid(){
      switch (this.currentStep){
        case 0:
          return this.selectedProduct != null && this.selectedExtra != null;
        case 1:
          return this.paymentMethod != 0;
      }
    },
    checkout() {
      let data = {
        payment_method: parseInt(this.paymentMethod),
        productCounts: [{
          'product_id': this.selectedProduct,
          'count': 1
        }, {
          'product_id': this.selectedExtra,
          'count': 1
        }],
        'invoice_contact' : this.invoiceContact
      };

      this.$store.dispatch("checkout", data).then((data) => {
        if (data.success) {
          switch (parseInt(this.paymentMethod)) {
            case 1:
              this.redirectToStripe(data.session_id)
              break;
            case 2:
              this.currentStep = 3;

              break;
          }
        } else {
          this.$sentry.captureException(new Error(data));

          this.error = "Leider ist ein Fehler aufgetreten."
          this.currentStep = 99;
        }
      });
    },
    redirectToStripe: function (sessionId) {
      var stripe = Stripe(process.env.STRIPE_API_KEY);
      stripe.redirectToCheckout({
        sessionId: sessionId,
      });
    },
  getExtra(id){
    switch (id){
      case '733':
        return 'Digital per E-Mail';
      case '734':
        return 'Versand';
      case '735':
        return 'Abholung Deluxe-Box';
    }
  },
    getGiftCardValue(id){
      switch (id){
        case '719':
          return 10;
        case '720':
          return 25;
        case '721':
          return 50;
        case '722':
          return 100;
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  asyncData(context) {
    let path = '/members/shop';
    return context.store.dispatch('loadPage', path).catch((e) => {
      context.error({statusCode: e.response.status, message: e.response.statusText})
    });
  }
}
</script>

<style lang="scss">
.form-item{
  display: flex;
    width: 250px;
    justify-content: space-between;
}
</style>
