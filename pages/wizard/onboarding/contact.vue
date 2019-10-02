<template>
  <div class="section">
    <h2>Kontaktdaten</h2>
    <form class="form" @submit.prevent="updateUser">
      <!--
      <div class="form-item">
        <span class="label">Vorname</span>
        <input class="input-text" disabled type="text" v-model="user.profile.firstName" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Nachname</span>
        <input class="input-text" disabled type="text" v-model="user.profile.lastName" name="" id=""/>
      </div>
      -->
      <div class="form-item">
        <span class="label">Geburtsdatum</span>
        <input class="input-text" type="text" v-model="user.profile.birthdate" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Telefon</span>
        <input class="input-text" type="text" v-model="user.profile.phone" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Adresse</span>
        <input class="input-text" type="text" v-model="user.profile.address" name="" id=""/>
      </div>
      <div class="form-item">
        <span></span>
        <input class="input-text" type="text" v-model="user.profile.address2" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">PLZ</span>
        <input class="input-text" type="text" v-model="user.profile.zip" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Stadt</span>
        <input class="input-text" type="text" v-model="user.profile.city" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Firma</span>
        <input class="input-text" type="text" v-model="user.profile.company" name="" id=""/>
      </div>
    </form>
    <div class="wizard-checkbox">
      <p>Wir gehen verantwortungsvoll mit deinen Daten um.</p>
      <label>
        <Checkbox :value="dsBool" theme="form">Ja, ich habe die Datenschutzerklärung gelesen und bin damit einverstanden.</Checkbox>
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
      loading: false,
      dsBool: false
    }
  },
  created() {
  },
  methods: {
    updateUser(event) {
      this.loading = true;
      this.$store.dispatch('updateUser', Object.assign({}, this.user.profile)).then(() => {
        this.loading = false;
        this.$notify({
          title: 'Yay!',
          text: 'Änderungen gespeichert.'
        });
      }).catch((e) => {
        this.loading = false;
        this.$notify({
          title: 'Error',
          type: 'error',
          text: 'Ein Fehler ist aufgetreten.'
        });
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  }
}
</script>

<style lang="scss">
</style>
