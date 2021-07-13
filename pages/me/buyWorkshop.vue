<template>
  <div class="workshop-overview">
    <div
      v-if="workshopDate != null"
      class="left-content"
    >
      <h1>Workshop-Buchung</h1>

      <workshop-preview
        :id="workshopDate.content.workshop.uuid"
        :key="reloadKey"
        class="preview"
      />
      <workshop-dates
        :dates="[workshopDate]"
        class="workshop-dates"
        :hide-register="true"
      />

      <div class="spacer" />

      <div v-if="step == 0 && userMetadata != null">
        <div>
          <div class="info-row payment">
            <div class="info-block">
              <div class="col info title">
                Zahlungsmethode auswählen
              </div>
            </div>
          </div>
        </div>

        <!-- User has credits, but not enough to pay for the workshop -->
        <div
          v-if="memberHasCredits && !memberHasEnoughCredits"
          class="info-row option"
        >
          <div class="info-block">
            <div :class="['col', 'info', 'creditsOption']">
              <div class="first">
                <input
                  id="sepa"
                  type="checkbox"
                  name="payment"
                  value="credits"
                  @click="useRemainingCredits = true"
                >
                <label
                  for="credits"
                  class="label"
                >
                  Restliche Credits ({{ credits }}EUR) abziehen
                </label>
              </div>
              <button
                class="input-button-primary creditsButton"
                @click="$router.push(`giftcards?action=redeem&origin=${$route.query.uuid}`)"
              >
                Gutschein einlösen
              </button>
            </div>
          </div>
        </div>

        <!-- User has enough credits for workshop, or has zero credits (in which case the option will be visible but disabled) -->
        <div
          v-if="!memberHasCredits || memberHasEnoughCredits"
          class="info-row option"
        >
          <div class="info-block">
            <div :class="['col', 'info', 'creditsOption', { disabled: !memberHasEnoughCredits }]">
              <div class="first">
                <input
                  id="sepa"
                  type="radio"
                  :disabled="!memberHasEnoughCredits"
                  name="payment"
                  value="credits"
                  @click="paymentMethod = PAYMENT_METHODS.credits"
                >
                <label
                  for="credits"
                  class="label"
                >
                  Credits (aktueller Stand: {{ credits }}EUR)
                </label>
              </div>
              <button
                class="input-button-primary creditsButton"
                @click="$router.push(`giftcards?action=redeem&origin=${$route.query.uuid}`)"
              >
                Gutschein einlösen
              </button>
            </div>
          </div>
        </div>

        <div>
          <div class="info-row option">
            <div class="info-block">
              <div class="col info">
                <input
                  id="stripe"
                  type="radio"
                  name="payment"
                  value="stripe"
                  @click="paymentMethod = PAYMENT_METHODS.stripe"
                >
                <label for="stripe">Kreditkarte</label><br>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="userMetadata.sepa_active"
          class="info-row option"
        >
          <div class="info-block">
            <div class="col info">
              <input
                id="sepa"
                type="radio"
                name="payment"
                value="sepa"
                @click="paymentMethod = PAYMENT_METHODS.sepa"
              >
              <label for="sepa">SEPA-Monatsrechnung</label><br>
            </div>
          </div>
        </div>
        <div class="spacer" />

        <div class="buttons">
          <button
            class="input-button-back"
            :disabled="!paymentMethod"
            @click="onNextStep(1)"
          >
            Weiter...
          </button>
        </div>
      </div>

      <div v-if="step == 1">
        <h2>Bestätigung</h2>

        <div
          v-if="isFree"
          class="confirmation"
        >
          Deine Anmeldung ist verbindlich. Solltest du doch nicht teilnehmen können, gib uns bitte umgehend unter <a href="mailto:events@grandgarage.eu">events@grandgarage.eu</a> Bescheid.
        </div>
        <div
          v-else
          class="confirmation"
        >
          <div v-if="useRemainingCredits">
            Von deinen Credits {{ credits === 1 ? 'wird' : 'werden' }} {{ credits }}EUR abgezogen.
          </div>
          <div v-if="paymentMethod === 1">
            <strong>{{ finalWorkshopPrice }}EUR {{ finalWorkshopPrice === 1 ? 'wird' : 'werden' }} von deiner Kreditkarte abgebucht.</strong>
          </div>
          <div v-if="paymentMethod === 2">
            <strong>{{ finalWorkshopPrice }}EUR {{ finalWorkshopPrice === 1 ? 'wird' : 'werden' }} via SEPA-Monatsrechnung eingezogen.</strong>
          </div>
          <div v-if="paymentMethod === 3">
            {{ finalWorkshopPrice }}EUR {{ finalWorkshopPrice === 1 ? 'wird' : 'werden' }} von deinen Credits ({{ credits }}EUR) abgezogen.
          </div>
        </div>

        <div class="buttons">
          <button
            v-if="!isFree"
            class="input-button-back"
            @click="back"
          >
            Zurück
          </button>
          <button
            class="input-button-payment"
            @click="onNextStep(3)"
          >
            <template v-if="isFree">
              Termin kostenlos buchen
            </template>
            <template v-else>
              Workshop kostenpflichtig buchen
            </template>
          </button>
        </div>
      </div>

      <div v-if="step == 3">
        <loading-spinner
          class="spinner"
          color="black"
        />
      </div>
      <div v-if="step == 4">
        Workshop gebucht!<br>
        <button
          class="input-button-primary"
          @click="$router.push('workshopBookings')"
        >
          Meine Workshops anzeigen
        </button>
      </div>
      <div v-if="step == 99">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
const PAYMENT_METHODS = {
  free: 0,
  stripe: 1,
  sepa: 2,
  credits: 3
}
export default {
  name: 'BuyWorkshop',
  props: {},
  data () {
    return {
      PAYMENT_METHODS,
      paymentMethod: null,
      step: 0,
      reloadKey: 0,
      workshopDate: null,
      userMetadata: null,
      error: null,
      credits: 0,
      useRemainingCredits: false
    }
  },
  computed: {
    memberHasEnoughCredits () {
      return this.credits >= this.workshopPrice
    },
    memberHasCredits () {
      return this.credits > 0
    },
    workshopPrice () {
      // TODO are there workshops with price_external?
      return this.workshopDate.content.workshop.content.price_internal
    },
    isFree () {
      return parseInt(this.workshopPrice) === 0
    },
    finalWorkshopPrice () {
      if (this.useRemainingCredits) {
        return this.workshopPrice - this.credits
      }
      return this.workshopPrice
    }
  },
  async mounted () {
    await this.getWorkshop()
    if (this.isFree) {
      this.step = 1
    }
    this.$store.dispatch('getUserMetadata').then(data => {
      this.userMetadata = data.data
    })
    this.credits = await this.$store.dispatch('getCredits')
    window.scrollTo(0, 0) // Scroll to top
  },
  methods: {
    back () {
      this.step = 0
      this.paymentMethod = null
      this.useRemainingCredits = false
    },
    async getWorkshop () {
      await this.$store.dispatch('loadStoryByUUid', this.$route.query.uuid).then(data => {
        this.workshopDate = data.story
      })
    },
    onNextStep (step) {
      this.step = step
      switch (step) {
        case 3:
          this.pay()
          break
      }
    },
    redirect: function (data) {
      const stripe = Stripe('pk_live_XCUCaJMt8kMEpedQdvmtMu4Z00rNP9VDun')
      stripe.redirectToCheckout({
        sessionId: data.session_id
      })
    },

    pay: function () {
      if (this.isFree) {
        this.paymentMethod = PAYMENT_METHODS.free
      }
      const data = {
        workshop_date_id: this.workshopDate.uuid,
        payment_method: this.paymentMethod,
        use_remaining_credits: this.useRemainingCredits
      }
      this.$store.dispatch('bookWorkshop', data).then((data) => {
        if (data.success) {
          switch (this.paymentMethod) {
            case PAYMENT_METHODS.stripe:
              this.redirect(data)
              break
            default:
              this.step = 4
              this.getWorkshop()
              this.reloadKey++
              this.$toast.show('Der Workshop wurde erfolgreich gebucht!', {
                className: 'goodToast'
              })
          }
        } else {
          this.$sentry.captureException(new Error(data))

          this.error = 'Leider ist ein Fehler aufgetreten.'
          this.step = 99
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.workshop-overview {
  color: #000;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  @include margin-page-wide();
  @include media-breakpoint-up(md) {
    margin: 0 100px;
  }

  .link {
    cursor: pointer;
    font-weight: bold;
    padding: 10px;
    border: none;
    outline: none;
    color: #FFF;
    background-color: $color-orange;
  }

  .left-content {
    .headline {
      position: relative;
      @include media-breakpoint-up(md) {
        max-width: 50%;
        font-size: 2.8rem;
      }
      @include media-breakpoint-down(sm) {
        margin: 3vh 5%;
      }
      line-height: 1.5;
      font-family: $font-secondary;
    }

    .spacer {
      margin: 20px;
    }

    .info-row {
      @include media-breakpoint-down(md) {
        flex-direction: column;
      }
      background-color: #fff;
      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;
      //margin: -8px;
      display: flex;

      &.option {
        padding: 10px;
      }

      &.payment {
        background-color: #000;
        color: #fff;
      }

      &.bare {
        background: none;
        padding: 20px;
      }

      .info-block {
        flex: 1;
        flex-direction: row;
        display: flex;
      }

      .info-block {
        flex: 1;
        flex-direction: row;
        display: flex;
        justify-content: space-between;
      }

      .col {
        padding: 8px;

        &.soldOut {
          color: $color-orange;
          text-transform: uppercase;
        }

        &.register {
          background-color: $color-orange;

          a {
            color: #FFF;
          }
        }

        &.date {
          padding-top: 16px;
        }

        &.title {
          padding: 20px;
        }
      }

      svg {
        height: 1em;
        width: 1em;
      }
    }
  }

  .form .form-item {
    grid-template-columns: 54% 72%;
  }

  .full-text {
    color: #ff0000;
    margin-bottom: 0;
    margin-top: 0;
  }

}

</style>
<style lang="scss">
.preview {
  pointer-events: none;

  .preview-wrapper {
    .workshop-preview {
      width: 100% !important;
      padding: 0 !important;

      .story {
        padding: 0;
      }
    }
  }
}
.creditsOption {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  & .creditsButton {
    margin: 0;
  }
  & .first {
    display: flex;
    & label {
      margin-left: 0.6em;
    }
  }
}
.disabled {
  color: grey;
}
.spinner {
  margin-top: 2em;
}
.confirmation {
  & div {
    padding: 0.2em 0em;
  }
}
</style>
