<template>
  <div>
    <div v-if="currentStep == 0">
      gutscheinverkauf blabla
      <br>
      <select v-model="selectedProduct">
        <option value="25">25€</option>
        <option value="50">50€</option>
        <option value="100">100€</option>
        <option value="200">200€</option>
      </select>
      <button v-on:click="nextStep()">next</button>
    </div>
    <div v-if="currentStep == 1">
      bestätigung
      du willst {{ selectedValue }}€ gutschein kaufen
      <button v-on:click="nextStep()">next</button>
    </div>
    <div v-if="currentStep == 2">
      <input type="radio" name="paymentMethod" value="1" v-model="paymentMethod">Kreditkarte<br>
      <input type="radio" name="paymentMethod" value="2" v-model="paymentMethod">SEPA-Monatsrechnung<br>

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
      paymentMethod: 0,
      error: ''
    }
  },
  created() {
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    checkout() {
      let data = {
        payment_method: parseInt(this.paymentMethod),
        productCounts: [{'product_id': 69, 'count': 1}]
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
