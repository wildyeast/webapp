<template>
  <div class="section onboarding-wizard">
    <h2>Willkommen in der GRAND GARAGE!</h2>
    <p class="description">
      Als Mitglied in unserem Makerspace bekommst du, neben der Nutzung der Maschinen und Geräte, eine lebendige Community sowie kostenfreies WLAN und eine persönliche Membercard obendrauf!
      <br>
      Außerdem erhältst du eine Ermäßigung auf alle Workshops sowie die Möglichkeit, Materialien und Arbeitskleidung zum Einkaufspreis zu kaufen und unsere MakerSpaceShips für Transporte auszuleihen.
      <br><br>
      Solltest du noch Fragen zu deiner Mitgliedschaft haben, melde dich einfach beim Frontdesk Team oder schreib uns eine Nachricht! Schön, dass du da bist!
      <br><br>
      #MAKERSGONNAMAKE</p>
    <div class="options">
      <div :class="['option', { selected: selectedType === TYPES.regular }]" @click="selectedType = TYPES.regular">
        <span class="name">regulär 40/m</span>
        <span class="description">für Schülerinnen, Studierende, Lehrende, Pensionist*innen</span>
        <span class="description">Bitte entsprechenden Ausweis beim ersten Besuch mitnehmen!</span>
      </div>
      <div :class="['option', { selected: selectedType === TYPES.reduced }]" @click="selectedType = TYPES.reduced">
        <span class="name">ermäßigt 15/m</span>
        <span class="description">4you card, SchülerInnen, Studierende, Lehrlinge bis 28 Jahre, Behindertenpass</span>
      </div>
   </div>
    <Checkbox :value="agbBool" theme="form">Ja, ich habe die Allgemeinen Geschäftsbedingungen (AGB) und die Werkstattordnung gelesen und bin damit einverstanden.</Checkbox>
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
    border: 2px solid $color-orange !important;

  }
  .spacer {
    flex: 1;
  }
}

</style>
