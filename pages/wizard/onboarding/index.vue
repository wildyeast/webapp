<template>
  <div class="section onboarding-wizard">
    <h2>Du willst also eine Mitgliedschaft abschließen?</h2>
    <p>Blah blah blah</p>
    <div class="options">
      <div :class="['option', { selected: selectedType === TYPES.regular }]" @click="selectedType = TYPES.regular">
        <span class="name">regulär 40/m</span>
        <span class="description">Schuelerinnen, Studierende, Lehrende, Pensioniste</span>
      </div>
      <div :class="['option', { selected: selectedType === TYPES.reduced }]" @click="selectedType = TYPES.reduced">
        <span class="name">ermäßigt 15/m</span>
        <span class="description">4you card, SchülerInnen, Studierende, Lehrlinge bis 28 Jahre, Behindertenpass</span>
      </div>
   </div>
    <div class="spacer"></div>
<!--    <div class="wizard-checkbox">-->
      <Checkbox :value="agbBool" theme="form">Ja, ich habe die Allgemeinen Nutzungsbedingungen (ANB) und die Werkstattordnung gelesen und bin damit einverstanden.</Checkbox>
<!--    </div>-->
  </div>
</template>

<script>
import Checkbox from "~/components/Checkbox.vue";
const TYPES = {
  regular: 0,
  reduced: 1,
  free: 2
}
export default {
  middleware: 'authenticated',
  components: {
    Checkbox
  },
  data () {
    return {
      TYPES,
      loading: false,
      agbBool: false,
      selectedType: null
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
  .option {
    display: flex;
    flex-direction: column;
    & .name {
      font-weight: bolder;
    }
    & .description {
      color: grey;
      margin-top: 0.5em;
    }
  }
  .selected {
    background-color: $color-orange;
    border: 1px solid grey;

  }
  .spacer {
    flex: 1;
  }
}

</style>
