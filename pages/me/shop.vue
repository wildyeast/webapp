<template>
  <div>
    <h2>Gutscheine</h2>
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content"
               :is="story.content.component"></component>
    <template v-if="page === PAGES.initial">

      <button class="input-button-primary" @click="page = PAGES.buying">Gutschein kaufen</button>
      <button class="input-button-primary" @click="page = PAGES.redeeming">Gutschein einlösen</button>
    </template>


    <div class="giftcardForm" v-if="page === PAGES.buying">
      <h4>Gutschein kaufen</h4>
      <div class="input">
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

      <div class="input">
        <span>
          Extras:
        </span>
        <select class="form-item" v-model="selectedExtra">
          <option value="733">E-mail - Gratis</option>
          <option value="734">Versand-Standard - 3€</option>
          <option value="735">Deluxe-Box - 25€</option>
        </select>
      </div>

      <div class="buttons">
        <button class="input-button-back" @click="back">Zurück</button>
        <button class="input-button-primary" :disabled="!selectedProduct || !selectedExtra" @click="page = PAGES.paying">Weiter...</button>
      </div>
    </div>

    <div class="giftcardForm" v-if="page === PAGES.redeeming">
      <h4>Gutschein einlösen</h4>
      <div class="input">
        <span>
          Gutschein-Code:
        </span>
        <input class="form-item" v-model="giftcardCode">
      </div>

      <div class="buttons">
        <button class="input-button-back" @click="back">Zurück</button>
        <button class="input-button-primary" :disabled="!giftcardCode" @click="redeem">Einlösen</button>
      </div>
    </div>

    <div v-if="page === PAGES.paying">
      <h4>Gutschein kaufen</h4>
      <h5>Zahlungsmethode:</h5>
      <input type="radio" name="paymentMethod" value="1" v-model="paymentMethod">Kreditkarte<br>
      <div v-if="invoiceContact.sepa_mandate_agreed">
            <input type="radio" name="paymentMethod" value="2"  v-model="paymentMethod">SEPA-Monatsrechnung<br>
      </div>


      <div v-if="invoiceContact != null">
        <h5>Rechnungsadresse:</h5>

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
          <span class="label">Adresse</span>
          <input class="input-text" type="text" v-model="invoiceContact.street" name=""/>
        </div>        
        <div class="form-item">
          <span class="label"></span>
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

      <div class="buttons">
        <button class="input-button-back" @click="back">Zurück</button>
        <button class="input-button-primary" :disabled="!paymentMethod" @click="page = PAGES.confirming">Bestellung prüfen...</button>
      </div>
    </div>

    <div v-if="page === PAGES.confirming">
      <h4>Gutschein kaufen</h4>
      Bestätigung:
      <ul>
        <li>Gutschein {{getGiftCardValue(selectedProduct)}}€</li>
        <li>Extra: {{getExtra(selectedExtra)}}</li>
      </ul>

      <loading-spinner v-if="loading" color="#333"></loading-spinner>
      <div class="buttons">
        <button class="input-button-back" @click="back">Zurück</button>
        <button class="input-button-primary" :disabled="!paymentMethod || loading" @click="checkout()">Kostenpflichtig bestellen</button>
      </div>
    </div>

    <div v-if="page === PAGES.sold">
      Kauf abgeschlossen. Die Rechnung und deinen Gutschein erhältst du per Mail.
    </div>

    <div v-if="page === PAGES.redeemed">
      Gutschein eingelöst!
    </div>
    
    <div v-if="page === PAGES.wrongCode">
      <h4>Gutschein einlösen</h4>
      Kein Gutschein mit diesem Code gefunden.
      <div class="buttons">
        <button class="input-button-back" @click="back">Zurück zur Eingabe</button>
      </div>
    </div>

    <div v-if="page === PAGES.alreadyRedeemed">
      <h4>Gutschein einlösen</h4>
      Dieser Gutschein ist bereits eingelöst worden.
      <div class="buttons">
        <button class="input-button-back" @click="back">Nochmal versuchen</button>
      </div>
    </div>
  
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

const PAGES = {
  initial: 0,
  buying: 1,
  paying: 2,
  confirming: 3,
  sold: 4,
  redeeming: 10,
  wrongCode: 11,
  alreadyRedeemed: 12,
  redeemed: 13,
  error: 99
}

export default {
  middleware: 'authenticated',
  mixins: [storyblokLivePreview],
  data() {
    return {
      PAGES,
      page: PAGES.initial,  
      selectedProduct: null,
      selectedExtra: null,
      giftcardCode: null,
      paymentMethod: 0,
      error: '',
      shippingAddressEnabled: 0,
      invoiceContact: null,
      sepa_active: false,
      shippingAddress: [],
      loading:false
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
    back () {
      if ([PAGES.buying, PAGES.redeeming, PAGES.error].includes(this.page)) {
        this.page = PAGES.initial
        this.selectedProduct = ''
        this.selectedExtra = ''
        this.giftcardCode = ''
        return
      }
      if (this.page === PAGES.paying) {
        this.page = PAGES.buying
        return
      }
      if (this.page === PAGES.confirming) {
        this.page = PAGES.paying
        return
      }
      if ([PAGES.wrongCode, PAGES.alreadyRedeemed].includes(this.page)) {
        this.page = PAGES.redeeming
      }
    },
    async redeem () {
      // TODO call endpoint
      this.loading = true
      const response = await this.$store.dispatch('redeemGiftCard', {
        uuid: this.giftcardCode
      })
      console.log(response.msg)
      if (!response.success) {
        if (response.already_redeemed) {
          this.page = PAGES.alreadyRedeemed
          return
        }
        if (response.invalid_code) {
          this.page = PAGES.wrongCode
        }
      }
      this.loading = false
    },
    checkout() {
      this.loading=true;
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
          this.loading=false;
          switch (parseInt(this.paymentMethod)) {
            case 1:
              this.redirectToStripe(data.session_id)
              break;
            case 2:
              this.page = PAGES.sold
              break;
          }
        } else {
          this.$sentry.captureException(new Error(data));

          this.error = "Leider ist ein Fehler aufgetreten."
          this.page = PAGES.error
        }
      });
    },
    redirectToStripe: function (sessionId) {
      var stripe = Stripe('pk_live_XCUCaJMt8kMEpedQdvmtMu4Z00rNP9VDun');
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
  flex-flow: row nowrap;
  width: 20em;
  justify-content: space-between;
  align-items: center;
}
.giftcardForm {
  & .input {
    display: flex;
    padding-bottom: 0.3em;
    flex-flow: row nowrap;
    align-items: center;
    & :first-child {
      width:7em;
    }
  }
}
.buttons {
  & * {
    margin-right: 1em;
  }
}
h5 {
  font-size: 1rem;
}
</style>
