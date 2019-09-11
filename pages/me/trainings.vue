<template>
  <div class="section">
    <h2>Trainings</h2>
    <ul class="item-list" v-if="user.trainings && user.trainings.length > 0">
      <li v-for="t in user.trainings"><training :userTraining="t" /></li>
    </ul>
    <div v-else>
      <code>Noch keine Trainings vorhanden</code>
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
