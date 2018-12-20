<template>
  <div class="register-success-form">
    <h3>Willkommen</h3>
    <p>Bitte prüfe deine Email um deinen Account zu bestätigen.</p>
    <button @click="close">Zurück</button>
    <button @click="login">Zum Login</button>
  </div>
</template>

<script>

export default {
  props: ['blok'],
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.register-success-form {
}
</style>
