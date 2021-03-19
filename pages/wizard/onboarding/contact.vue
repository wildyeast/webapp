<template>
  <div class="section">
    <h2>Kontaktdaten</h2>
      <form class="form">
      <!--
      <div class="form-item">
        <span class="label">Vorname</span>
        <input class="input-text" disabled type="text" v-model="onboardingData.profile.firstName" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Nachname</span>
        <input class="input-text" disabled type="text" v-model="onboardingData.profile.lastName" name="" id=""/>
      </div>
      -->
      <div class="form-item">
        <span class="label">Geburtsdatum <span class="red">*</span></span>
        <input class="input-text" ref="firstInput" type="date" required v-model="onboardingData.profile.birthdate" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Telefon <span class="red">*</span></span>
        <input class="input-text" type="tel" v-model="onboardingData.profile.phone" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Adresse <span class="red">*</span></span>
        <input class="input-text" type="text" v-model="onboardingData.profile.address" name="" id=""/>
      </div>
      <div class="form-item">
        <span></span>
        <input class="input-text" type="text" v-model="onboardingData.profile.address2" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">PLZ <span class="red">*</span></span>
        <input class="input-text" type="number" v-model="onboardingData.profile.zip" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Stadt <span class="red">*</span></span>
        <input class="input-text" type="text" v-model="onboardingData.profile.city" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Firma</span>
        <input class="input-text" type="text" v-model="onboardingData.profile.company" name="" id=""/>
      </div>
    </form>
  </div>
</template>

<script>
import Checkbox from "~/components/Checkbox.vue";
export default {
  middleware: 'authenticated',
  props: {
    onboardingData: {
      type: Object,
      required: true
    }
  },
  components: {
    Checkbox
  },
  data () {
    return {
      loading: false,
    }
  },
  mounted () {
    this.$refs.firstInput.focus()
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.red {
  color: $color-red;
}
.form-item {
  min-width: 27em;
}
</style>
