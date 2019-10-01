<template>
  <div class="section">
    <h2>Packages</h2>
    <ul class="item-list" v-if="user && user.packages && user.packages.length > 0">
      <li v-for="p in user.packages"><package :userPackage="p" /></li>
    </ul>
    <div v-else>
      <code>Keine Mitgliedschaft abgeschlossen</code>
      <div class="link-with-arrow">
        <div class="link-text">
          <div class="link-arrow">
          </div>
          <Nuxt-Link to="/wizard/onboarding/">Mitglied werden</Nuxt-Link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {}
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
