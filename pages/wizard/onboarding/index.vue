<template>
  <div class="section onboarding-wizard">
    <h2>Willkommen in der GRAND GARAGE!</h2>
    <p class="text">
      Als Mitglied in unserem Makerspace bekommst du, neben der Nutzung der Maschinen und Geräte, eine lebendige Community sowie kostenfreies WLAN und eine persönliche Membercard obendrauf!
      <br>
      Außerdem erhältst du eine Ermäßigung auf alle Workshops sowie die Möglichkeit, Materialien und Arbeitskleidung zum Einkaufspreis zu kaufen und unsere MakerSpaceShips für Transporte auszuleihen.
      <br><br>
      Solltest du noch Fragen zu deiner Mitgliedschaft haben, melde dich einfach beim Frontdesk Team oder schreib uns eine Nachricht! Schön, dass du da bist!
      <br><br>
      #MAKERSGONNAMAKE</p>
    <div class="options">
      <div :class="['option', { selected: onboardingData.paymentType === TYPES.regular }]"
           @click="onboardingData.paymentType = TYPES.regular">
        <span class="name">regulär 40EUR/m</span>
      </div>
      <div :class="['option', { selected: onboardingData.paymentType === TYPES.reduced }]"
          @click="onboardingData.paymentType = TYPES.reduced">
        <span class="name">ermäßigt 15EUR/m</span>
        <span class="description">4you card, SchülerInnen, Studierende, Lehrlinge bis 28 Jahre, Behindertenpass</span>
        <span class="description">Bitte entsprechenden Ausweis beim ersten Besuch mitnehmen!</span>
      </div>
   </div>
    <div>
      <input type="checkbox" name="checkbox" v-model="onboardingData.rulesAccepted">
      <label for="checkbox">Ja, ich habe die <a href="https://grandgarage.sharepoint.com/:b:/s/GRANDGARAGE/EQpdYazohn5DtE60FEPxfy4BpQ_1NMXNtoG7rHj3zQnGeQ?e=ewUyWh"
                                                target="new">Werkstattordnung</a> gelesen und bin damit einverstanden.</label>
    </div>
  </div>
</template>

<script>
import Checkbox from "~/components/Checkbox.vue";
const TYPES = {
  regular: 1,
  reduced: 2
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
      TYPES,
      loading: false,
    }
  },
  created() {
  },
  methods: {
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.onboarding-wizard {
  height: 100%;
  display: flex;
  flex-direction: column;
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
      display: flex;
      flex-direction: column;

      &:hover {
        border: 2px solid $color-orange;
      }
    }
    .description {
      color:grey;
    }
  }
  .name {
    font-weight: bolder;
    margin-bottom: 1em;
  }
  .text {
    text-align: center;
  }
  .selected {
    border: 2px solid $color-orange !important;
  }
  .spacer {
    flex: 1;
  }
}

</style>
