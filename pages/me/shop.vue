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
        <select v-model="selectedProduct">
          <option value="69">10€</option>
          <option value="69">25€</option>
          <option value="69">50€</option>
          <option value="69">100€</option>
        </select>
      </div>

      <div>
        <span>
          Versandoption:
        </span>
        <select v-model="selectedExtra">
          <option value="69">E-mail - Gratis</option>
          <option value="69">Standard - 3€</option>
          <option value="69">Deluxe - 20€</option>
        </select>
      </div>

      <button v-on:click="nextStep()">next</button>
    </div>
    <div v-if="currentStep == 1">
      bestätigung
      du willst {{ selectedProduct }}€ gutschein kaufen
      delivery method: {{ selectedExtra }}
      <button v-on:click="nextStep()">next</button>
    </div>
    <div v-if="currentStep == 2">
      <input type="radio" name="paymentMethod" value="1" v-model="paymentMethod">Kreditkarte<br>
      <input type="radio" name="paymentMethod" value="2" v-model="paymentMethod">SEPA-Monatsrechnung<br>


      <div v-if="invoiceContact != null">
        <h4>Rechnungsaddresse:</h4>

        <div class="form-item">
          <span class="label">Vorname</span>
          <input class="input-text" type="text" readonly v-model="invoiceContact.firstname" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Nachname</span>
          <input class="input-text" type="text" readonly v-model="invoiceContact.lastname" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Telefon</span>
          <input class="input-text" type="text" readonly v-model="invoiceContact.phone" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Straße</span>
          <input class="input-text" type="text" readonly v-model="invoiceContact.street" name=""/>
        </div>        <div class="form-item">
          <span class="label">Straße</span>
          <input class="input-text" type="text" readonly v-model="invoiceContact.street_additional" name=""/>
        </div>
        <div class="form-item">
          <span class="label">PLZ</span>
          <input class="input-text" type="text" readonly v-model="invoiceContact.zip" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Stadt</span>
          <input class="input-text" type="text" v-model="invoiceContact.city" name=""/>
        </div>
      </div>

      <label for="shippingAddress">Lieferaddresse entspricht nicht der Rechnungsaddresse</label>
      <input type="checkbox" id="shippingAddress" name="shippingAddress" v-model="shippingAddressEnabled">
      <div v-if="shippingAddressEnabled">
        <h4>Lieferaddresse:</h4>
        <div class="form-item">
          <span class="label">Vorname</span>
          <input class="input-text" type="text" v-model="shippingAddress.firstname" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Nachname</span>
          <input class="input-text" type="text" v-model="shippingAddress.lastname" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Telefon</span>
          <input class="input-text" type="text" v-model="shippingAddress.phone" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Straße</span>
          <input class="input-text" type="text" v-model="shippingAddress.address" name=""/>
        </div>
        <div class="form-item">
          <span class="label">PLZ</span>
          <input class="input-text" type="text" v-model="shippingAddress.zip" name=""/>
        </div>
        <div class="form-item">
          <span class="label">Stadt</span>
          <input class="input-text" type="text" v-model="shippingAddress.city" name=""/>
        </div>
      </div>

      <button v-on:click="checkout()">checkout</button>
    </div>
    <div v-if="currentStep == 3">
      done
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
      console.log(this.userMetadata)
    })
  },
  methods: {
    nextStep() {
      this.currentStep++;
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
        }]
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
</style>
