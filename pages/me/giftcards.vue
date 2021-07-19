<template href="http://www.w3.org/1999/html">
  <div>
    <h2 v-if="action">
      Gutschein {{ action === 'buy' ? 'kaufen' : 'einlösen' }}
    </h2>
    <h2 v-else>
      Gutscheine
    </h2>
<!--
    <template v-if="!action">
      <selection class="items">
        <section class="display-item">
          <div class="buy-button"
               @click="$router.push('giftcards?action=buy')">
            Gutschein kaufen
          </div>
        </section>
        <section class="display-item">
          <div class="redeem-button"
               @click="$router.push('giftcards?action=redeem')">
            Gutschein einlösen
          </div>
        </section>
      </selection>
    </template>
-->
<template v-if="!action">
<Nuxt-Link to="giftcards?action=buy">Gutschein kaufen</Nuxt-Link> /
<Nuxt-Link to="giftcards?action=redeem">Gutschein einlösen</Nuxt-Link><br><br>
</template>

    <transition name="fade">
      <template>
        <template v-if="action === 'buy'">
          <div
              v-if="step === 0"
              class="giftcardForm"
          >
            <div class="input">
              <span> Gutschein-Wert: </span>
              <select
                  v-model="selectedProduct"
                  class="form-item"
              >
                <option value="719">
                  10€
                </option>
                <option value="720">
                  25€
                </option>
                <option value="721">
                  50€
                </option>
                <option value="722">
                  100€
                </option>
              </select>
            </div>

            <div class="input">
              <span> Extras: </span>
              <select
                  v-model="selectedExtra"
                  class="form-item"
              >
                <option value="733">
                  E-mail - Gratis
                </option>
                <option value="734">
                  Versand-Standard - 3€
                </option>
                <option value="735">
                  Deluxe-Box - 25€
                </option>
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
                v-model="paymentMethod"
                type="radio"
                name="paymentMethod"
                value="1"
            >Kreditkarte<br>
            <div v-if="invoiceContact.sepa_mandate_agreed">
              <input
                  v-model="paymentMethod"
                  type="radio"
                  name="paymentMethod"
                  value="2"
              >SEPA-Monatsrechnung<br>
            </div>

            <div v-if="invoiceContact != null">
              <h4>Rechnungsadresse</h4>

              <div class="form-item">
                <span class="label">Vorname</span>
                <input
                    v-model="invoiceContact.firstname"
                    class="input-text"
                    type="text"
                    name=""
                >
              </div>
              <div class="form-item">
                <span class="label">Nachname</span>
                <input
                    v-model="invoiceContact.lastname"
                    class="input-text"
                    type="text"
                    name=""
                >
              </div>
              <div class="form-item">
                <span class="label">Telefon</span>
                <input
                    v-model="invoiceContact.phone"
                    class="input-text"
                    type="text"
                    name=""
                >
              </div>
              <div class="form-item">
                <span class="label">Adresse</span>
                <input
                    v-model="invoiceContact.street"
                    class="input-text"
                    type="text"
                    name=""
                >
              </div>
              <div class="form-item">
                <span class="label"/>
                <input
                    v-model="invoiceContact.street_additional"
                    class="input-text"
                    type="text"
                    name=""
                >
              </div>
              <div class="form-item">
                <span class="label">PLZ</span>
                <input
                    v-model="invoiceContact.zip"
                    class="input-text"
                    type="text"
                    name=""
                >
              </div>
              <div class="form-item">
                <span class="label">Stadt</span>
                <input
                    v-model="invoiceContact.city"
                    class="input-text"
                    type="text"
                    name=""
                >
              </div>
            </div>
            <div class="buttons">
              <button
                  class="input-button-back"
                  @click="step--"
              >
                Zurück
              </button>
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

            <div class="buttons">
              <button
                  class="input-button-back"
                  @click="step--"
              >
                Zurück
              </button>
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
          <div
              v-if="step === 0"
              class="giftcardForm"
          >
            <div class="input">
              <span> Gutschein-Code: </span>
              <input
                  v-model="giftcardCode"
                  class="form-item"
              >
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
    <loading-spinner
        v-if="loading"
        color="#333"
    />
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  mixins: [storyblokLivePreview],
  middleware: 'authenticated',
  asyncData (context) {
    const path = '/members/shop'
    return context.store.dispatch('loadPage', path).catch((e) => {
      context.error({
        statusCode: e.response.status,
        message: e.response.statusText
      })
    })
  },
  data () {
    return {
      step: 0,
      action: null,
      origin: null,
      selectedProduct: null,
      selectedExtra: null,
      giftcardCode: null,
      paymentMethod: 0,
      error: '',
      shippingAddressEnabled: 0,
      invoiceContact: null,
      sepa_active: false,
      shippingAddress: [],
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    '$route.query' (to) {
      this.getQuery(to)
    }
  },
  mounted () {
    this.$store.dispatch('getUserMetadata').then((data) => {
      this.invoiceContact = data.data.invoice_contact
      this.sepaActive = data.data.sepa_active
    })
    this.getQuery(this.$route.query)
  },
  methods: {
    getQuery (to) {
      // eslint-disable-next-line no-prototype-builtins
      if (to.hasOwnProperty('origin')) {
        this.origin = to.origin
      }
      // eslint-disable-next-line no-prototype-builtins
      if (to.hasOwnProperty('action') && ['buy', 'redeem'].includes(to.action)) {
        this.action = to.action
        this.step = 0
        return
      }
      this.action = null
    },
    async redeem () {
      this.loading = true
      const response = await this.$store.dispatch('redeemGiftCard', {
        uuid: this.giftcardCode
      })
      if (!response.success) {
        if (response.already_redeemed) {
          this.$toast.show('Dieser Gutschein ist bereits eingelöst worden!', {
            className: 'badToast'
          })
          this.giftcardCode = ''
          this.loading = false
          return
        }
        if (response.invalid_code) {
          this.$toast.show('Kein Gutschein mit diesem Code gefunden.', {
            className: 'badToast'
          })
          this.loading = false
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
    checkout () {
      this.loading = true
      const data = {
        payment_method: parseInt(this.paymentMethod),
        productCounts: [
          {
            product_id: this.selectedProduct,
            count: 1
          },
          {
            product_id: this.selectedExtra,
            count: 1
          }
        ],
        invoice_contact: this.invoiceContact
      }

      this.$store.dispatch('checkout', data).then((data) => {
        if (data.success) {
          this.loading = false
          switch (parseInt(this.paymentMethod)) {
            case 1:
              this.redirectToStripe(data.session_id)
              break
            case 2:
              this.step++
              break
          }
        } else {
          this.$sentry.captureException(new Error(data))
          this.$toast.show('Ein Fehler ist aufgetreten', {
            theme: 'bubble'
          })
        }
      })
    },
    redirectToStripe: function (sessionId) {
      // eslint-disable-next-line no-undef
      const stripe = Stripe('pk_live_XCUCaJMt8kMEpedQdvmtMu4Z00rNP9VDun')
      stripe.redirectToCheckout({
        sessionId: sessionId
      })
    },
    getExtra (id) {
      switch (id) {
        case '733':
          return 'Digital per E-Mail'
        case '734':
          return 'Versand'
        case '735':
          return 'Abholung Deluxe-Box'
      }
    },
    getGiftCardValue (id) {
      switch (id) {
        case '719':
          return 10
        case '720':
          return 25
        case '721':
          return 50
        case '722':
          return 100
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';

.items{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.display-item {
  background-repeat: no-repeat;
  background-size: cover;
  width: 20em;
  height: 24em;
  position: relative;
  border: 1px solid black;

  .buy-button {
    cursor: pointer;
    background-color: #ff6f00;
    color: #FFF;
    border: 1px solid #ff8c33;
    padding: 7px 12px 8px;
    line-height: 1;
    outline: none;
    align-self: center;
    margin-top: 20px;
  }
}

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
