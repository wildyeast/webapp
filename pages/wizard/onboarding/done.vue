<template>
  <div class="section">
    <h2>FIN</h2>
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
</style>
