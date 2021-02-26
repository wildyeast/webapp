<template>
  <div>
    <h2 v-if="action">Gutschein {{ action === 'buy' ? 'kaufen' : 'einlösen' }}</h2>

    <h2 v-else>Gutscheine</h2>
    <template v-if="!action">
      <component
        v-if="story.content.component"
        :key="story.content._uid"
        :blok="story.content"
        :is="story.content.component"
      ></component>
      <button class="input-button-primary" @click="$router.push('giftcards?action=buy')">
        Gutschein kaufen
      </button>
      <button class="input-button-primary" @click="$router.push('giftcards?action=redeem')">
        Gutschein einlösen
      </button>
    </template>

    <transition name="fade">
      <template>
        <template v-if="action === 'buy'">
          <div class="giftcardForm" v-if="step === 0">
            <div class="input">
              <span> Gutschein-Wert: </span>
              <select class="form-item" v-model="selectedProduct">
                <option value="719">10€</option>
                <option value="720">25€</option>
                <option value="721">50€</option>
                <option value="722">100€</option>
              </select>
            </div>

            <div class="input">
              <span> Extras: </span>
              <select class="form-item" v-model="selectedExtra">
                <option value="733">E-mail - Gratis</option>
                <option value="734">Versand-Standard - 3€</option>
                <option value="735">Deluxe-Box - 25€</option>
              </select>
            </div>

            <div class="buttons">
              <button
                class="input-button-primary"
                :disabled="!selectedProduct || !selectedExtra"
                @click="step++"
              >
                Weiter...
              </button>
            </div>
          </div>

          <div v-if="step === 1">
            <h4>Zahlungsmethode</h4>
            <input
              type="radio"
              name="paymentMethod"
              value="1"
              v-model="paymentMethod"
            />Kreditkarte<br />
            <div v-if="invoiceContact.sepa_mandate_agreed">
              <input
                type="radio"
                name="paymentMethod"
                value="2"
                v-model="paymentMethod"
              />SEPA-Monatsrechnung<br />
            </div>

            <div v-if="invoiceContact != null">
              <h4>Rechnungsadresse</h4>

              <div class="form-item">
                <span class="label">Vorname</span>
                <input
                  class="input-text"
                  type="text"
                  v-model="invoiceContact.firstname"
                  name=""
                />
              </div>
              <div class="form-item">
                <span class="label">Nachname</span>
                <input
                  class="input-text"
                  type="text"
                  v-model="invoiceContact.lastname"
                  name=""
                />
              </div>
              <div class="form-item">
                <span class="label">Telefon</span>
                <input
                  class="input-text"
                  type="text"
                  v-model="invoiceContact.phone"
                  name=""
                />
              </div>
              <div class="form-item">
                <span class="label">Adresse</span>
                <input
                  class="input-text"
                  type="text"
                  v-model="invoiceContact.street"
                  name=""
                />
              </div>
              <div class="form-item">
                <span class="label"></span>
                <input
                  class="input-text"
                  type="text"
                  v-model="invoiceContact.street_additional"
                  name=""
                />
              </div>
              <div class="form-item">
                <span class="label">PLZ</span>
                <input
                  class="input-text"
                  type="text"
                  v-model="invoiceContact.zip"
                  name=""
                />
              </div>
              <div class="form-item">
                <span class="label">Stadt</span>
                <input
                  class="input-text"
                  type="text"
                  v-model="invoiceContact.city"
                  name=""
                />
              </div>
            </div>
            <div class="buttons">
              <button class="input-button-back" @click="step--">Zurück</button>
              <button
                class="input-button-primary"
                :disabled="!paymentMethod"
                @click="step++"
              >
                Bestellung prüfen...
              </button>
            </div>
          </div>

          <div v-if="step === 2">
            Bestätigung:
            <ul>
              <li>Gutschein {{ getGiftCardValue(selectedProduct) }}€</li>
              <li>Extra: {{ getExtra(selectedExtra) }}</li>
            </ul>

            <loading-spinner v-if="loading" color="#333"></loading-spinner>
            <div class="buttons">
              <button class="input-button-back" @click="step--">Zurück</button>
              <button
                class="input-button-payment"
                :disabled="!paymentMethod || loading"
                @click="checkout()"
              >
                Kostenpflichtig bestellen
              </button>
            </div>
          </div>
          <div v-if="step === 3">
            Kauf abgeschlossen. Die Rechnung und deinen Gutschein erhältst du per
            Mail.
          </div>
        </template>

        <template v-if="action === 'redeem'">
          <div class="giftcardForm" v-if="step === 0">
            <div class="input">
              <span> Gutschein-Code: </span>
              <input class="form-item" v-model="giftcardCode" />
            </div>

            <div class="buttons">
              <button
                class="input-button-payment"
                :disabled="!giftcardCode"
                @click="redeem"
              >
                Einlösen
              </button>
            </div>
          </div>
        </template>
      </template>
    </transition> 
  </div>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview";

export default {
  middleware: "authenticated",
  mixins: [storyblokLivePreview],
  data() {
    return {
      step: 0,
      action: null,
      origin: null,
      selectedProduct: null,
      selectedExtra: null,
      giftcardCode: null,
      paymentMethod: 0,
      error: "",
      shippingAddressEnabled: 0,
      invoiceContact: null,
      sepa_active: false,
      shippingAddress: [],
      loading: false,
    };
  },
  mounted () {
    this.$store.dispatch("getUserMetadata").then((data) => {
      this.invoiceContact = data.data.invoice_contact;
      this.sepaActive = data.data.sepa_active;
    });
    this.getQuery(this.$route.query)

  },
  watch: {
    "$route.query" (to) {
      this.getQuery(to)
    },
  },
  methods: {
    getQuery (to) {
      if (to.hasOwnProperty('origin')) {
        this.origin = to.origin
      }
      if (to.hasOwnProperty('action') && ['buy', 'redeem'].includes(to.action)) {
        this.action = to.action
        this.step = 0
        return
      }
      this.action = null;
    },
    async redeem () {
      this.loading = true;
      const response = await this.$store.dispatch("redeemGiftCard", {
        uuid: this.giftcardCode,
      });
      if (!response.success) {
        console.log('response', response)
        if (response.already_redeemed) {
          this.$toast.show('Dieser Gutschein ist bereits eingelöst worden!', {
            className: 'badToast'
          })
          this.giftcardCode = ''
          return
        }
        if (response.invalid_code) {
          this.$toast.show('Kein Gutschein mit diesem Code gefunden.', {
            className: 'badToast'
          })
          return
        }
      }
      if (this.origin) {
        this.$router.push(`buyWorkshop?uuid=${this.origin}`)
        return
      }
      this.loading = false
      this.$toast.show('Der Gutschein wurde erfolgreich eingelöst!', { 
        className: 'goodToast'
      })
      this.$router.push('credits')
    },
    checkout() {
      this.loading = true;
      let data = {
        payment_method: parseInt(this.paymentMethod),
        productCounts: [
          {
            product_id: this.selectedProduct,
            count: 1,
          },
          {
            product_id: this.selectedExtra,
            count: 1,
          },
        ],
        invoice_contact: this.invoiceContact,
      };

      this.$store.dispatch("checkout", data).then((data) => {
        if (data.success) {
          this.loading = false;
          switch (parseInt(this.paymentMethod)) {
            case 1:
              this.redirectToStripe(data.session_id);
              break;
            case 2:
              this.step++
              break;
          }
        } else {
          this.$sentry.captureException(new Error(data));
          this.$toast.show('Ein Fehler ist aufgetreten', {
            theme: 'bubble'
          })
        }
      });
    },
    redirectToStripe: function (sessionId) {
      var stripe = Stripe("pk_live_XCUCaJMt8kMEpedQdvmtMu4Z00rNP9VDun");
      stripe.redirectToCheckout({
        sessionId: sessionId,
      });
    },
    getExtra(id) {
      switch (id) {
        case "733":
          return "Digital per E-Mail";
        case "734":
          return "Versand";
        case "735":
          return "Abholung Deluxe-Box";
      }
    },
    getGiftCardValue(id) {
      switch (id) {
        case "719":
          return 10;
        case "720":
          return 25;
        case "721":
          return 50;
        case "722":
          return 100;
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  asyncData(context) {
    let path = "/members/shop";
    return context.store.dispatch("loadPage", path).catch((e) => {
      context.error({
        statusCode: e.response.status,
        message: e.response.statusText,
      });
    });
  },
};
</script>

<style lang="scss">
.form-item {
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
      width: 7em;
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
