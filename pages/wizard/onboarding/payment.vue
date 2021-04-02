<template>
  <div class="section onboarding-wizard">
    <h2>Wie möchtest du zahlen?</h2>
    <div class="options">
      <div :class="['option', { selected: onboardingData.paymentFrequency === FREQS.monthly }]"
        @click="onboardingData.paymentFrequency = FREQS.monthly">
        <b>monatliche Zahlung</b>
        <p>
          <template v-if="onboardingData.paymentType === 1">40</template>
          <template v-if="onboardingData.paymentType === 2">15</template>
          EUR / Monat
        </p>
      </div>
      <div :class="['option', { selected: onboardingData.paymentFrequency === FREQS.annually }]"
        @click="onboardingData.paymentFrequency = FREQS.annually">
        <b>jährliche Zahlung</b>
        <p>
          <template v-if="onboardingData.paymentType === 1">400</template>
          <template v-if="onboardingData.paymentType === 2">150</template>
          EUR / Jahr
        </p>
      </div>
    </div>
    <p><b>Tipp:</b> Bei jährlicher Zahlung bekommst du 2 Monate geschenkt.</p>
    <form class="form wizard">
      <div class="form-item">
        <span class="label">IBAN</span>
        <input class="input-text" type="text" v-model="onboardingData.payment.iban" name="" id=""/>
        <div>
          <font-awesome-icon class="ibanIcon success" v-if="ibanIsValid" icon="check-circle" />
          <font-awesome-icon class="ibanIcon" v-else icon="times-circle" />
        </div>
      </div>
      <div class="form-item ibanFormItem">
        <span class="label">Name der Bank</span>
        <input class="input-text" type="text" v-model="onboardingData.payment.bank" name="" id=""/>
        <span class="bankSpacer" />
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
import IBAN from 'iban';
import Checkbox from "~/components/Checkbox.vue";
const FREQS = {
  monthly: 1,
  annually: 2
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
      FREQS,
      selected: null
    }
  },
  computed: {
    ibanIsValid () {
      return this.validate(this.onboardingData.payment.iban)
    }
  },
  methods: {
    validate (iban) {
      if (!iban) {
        return
      }
      iban = iban.replace(/\s/g, '') // Remove spaces
      const isValid = IBAN.isValid(iban)
      this.onboardingData.ibanIsValid = isValid
      return isValid
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.onboarding-wizard {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .options {
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    margin: 0 -10px;
    width: 80%;
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
  .form-item {
    display: flex;
    width: 30em;
    & .label {
      width: 10em !important;
    }
  }
  .wizard-checkbox {
    margin-bottom: 1em;
  }
  .ibanIcon {
    margin-left: 1em;
    color: grey;
  }
  .success {
    color: green;
  }
  .bankSpacer {
    width: 2.7em;
  }
  .form {
    &.wizard {
      margin: 20px 0;
    }
  }
}

</style>
