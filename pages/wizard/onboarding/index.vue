<template>
  <div class="section onboarding-wizard">
    <h2>Du willst also eine Mitgliedschaft abschließen?</h2>
    <p>Blah blah blah</p>
    <div class="options">
      <div class="option">
        <b>regulär</b>
      </div>
      <div class="option">
        <b>ermäßigt</b>
      </div>
      <div class="option">
        <b>free</b>
      </div>
    </div>
    <div class="spacer"></div>
    <div class="wizard-checkbox">
      <Checkbox :value="agbBool" theme="form">Ja, ich habe die Allgemeinen Geschäftsbedingungen (AGB) und die Werkstattordnung gelesen und bin damit einverstanden.</Checkbox>
    </div>
  </div>
</template>

<script>
import Checkbox from "~/components/Checkbox.vue";

export default {
  middleware: 'authenticated',
  components: {
    Checkbox
  },
  data () {
    return {
      loading: false,
      agbBool: false,
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
  height: 100%;
  display: flex;
  flex-direction: column;
  .spacer {
    flex: 1;
  }
}

</style>
