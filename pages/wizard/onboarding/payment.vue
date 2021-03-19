<template>
  <div class="section onboarding-wizard">
    <h2>Wie möchtest du zahlen?</h2>
    <div class="options">
      <div :class="['option', { selected: onboardingData.paymentType === TYPES.monthly }]"
        @click="onboardingData.paymentType = TYPES.monthly">
        <b>monatliche Zahlung</b>
        <p>40EUR / Monat</p>
      </div>
      <div :class="['option', { selected: onboardingData.paymentType === TYPES.annual }]"
        @click="onboardingData.paymentType = TYPES.annual">
        <b>jährliche Zahlung</b>
        <p>400EUR / Jahr</p>
      </div>
    </div>
    <p><b>Tipp:</b> Bei jährlicher Zahlung bekommst du 2 Monate geschenkt.</p>
    <form class="form wizard">
      <div class="form-item">
        <span class="label">IBAN</span>
        <input class="input-text" type="text" v-model="user.payment.iban" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Name der Bank</span>
        <input class="input-text" type="text" v-model="user.payment.bank" name="" id=""/>
      </div>
    </form>

    <div class="wizard-checkbox">
      <label>
        <input type="checkbox" v-model="onboardingData.sepaAccepted">Meine Mitgliedsbeiträge und zusätzlich anfallende Kosten werden per SEPA-Lastschrift von meinem angegeben Konto eingehoben.</Checkbox>
      </label>
    </div>

  </div>
</template>

<script>
import Checkbox from "~/components/Checkbox.vue";
const TYPES = {
  monthly: 1,
  annual: 2
}
export default {
  middleware: 'authenticated',
  components: {
    Checkbox
  },
  props: {
    onboardingData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      TYPES,
      selected: null
    }
  },
  created() {
  },
  methods: {
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.onboarding-wizard {
  width: 100%;
  .options {
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    margin: 0 -10px;
    .option {
      margin: 10px;
      flex: 1;
      cursor: pointer;
      padding: 25px;
      background-color: #FFF;
      border: 2px solid #FFF;
      &:hover {
        border: 2px solid $color-orange;
      }
    }
    .selected {
      border: 2px solid $color-orange !important;
    }
  }
  .wizard-checkbox {
    max-width: 500px;
  }
  .form {
    &.wizard {
      margin: 20px 0;
    }
  }
}

</style>
