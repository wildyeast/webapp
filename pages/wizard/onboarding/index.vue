<template>
  <div class="section onboarding-wizard">
    <h2>Du willst also eine Mitgliedschaft abschließen?</h2>
    <p>Blah blah blah</p>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
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
}

</style>
