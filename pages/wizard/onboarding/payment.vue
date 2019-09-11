<template>
  <div class="section onboarding-wizard">
    <h2>Möchtest du monatlich oder jährlich zahlen?</h2>
    <div class="options">
      <div class="option">
        <b>monatliche Zahlung</b>
        <p>40 / Monat</p>
      </div>
      <div class="option">
        <b>jährliche Zahlung</b>
        <p>400 / Jahr</p>
      </div>
    </div>
    
    <form class="form" @submit.prevent="updateUser">
      <div class="form-item">
        <span class="label">IBAN</span>
        <input class="input-text" type="text" v-model="user.payment.iban" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Name der Bank</span>
        <input class="input-text" type="text" v-model="user.payment.bank" name="" id=""/>
      </div>
    </form>

    <div>
      <label>
        <!--
        <Checkbox :value="true">Meine Mitgliedsbeiträge und zusätzlich anfallende Kosten werden per SEPA-Lastschrift von meinem angegeben Konto eingehoben.</Checkbox>
        <span></span>
        -->
      </label>
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
      loading: false
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
  .options {
    padding-top: 20px;
    display: flex;
    justify-content: space-around;
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
  }
}

</style>
