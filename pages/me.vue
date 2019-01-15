<template>
  <section class="">
    <div class="profile" v-if="user">
      <div class="header">
        <h1 class="name">{{user.profile.firstName}} {{user.profile.lastName}}</h1>
        <code class="number">#{{user.profile.memberNumber}}</code>
        <button @click="logout">Logout</button>
      </div>
      <div class="section">
        <h3>Packages</h3>
        <ul v-if="user.packages && user.packages.length > 0">
          <li v-for="p in user.packages">{{p}}</li>
        </ul>
        <div v-else>
          <code>No Packages to show</code>
        </div>
      </div>
      <div class="section">
        <h3>Trainings</h3>
        <ul v-if="user.trainings && user.trainings.length > 0">
          <li v-for="p in user.trainings">{{p}}</li>
        </ul>
        <div v-else>
          <code>No Trainings to show</code>
        </div>
      </div>
    </div>
  </section>
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
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    packages() {
      return this.$store.state.packages;
    },
    trainings() {
      return this.$store.state.trainings;
    }
  }
}
</script>

<style lang="scss">
.profile {
  margin-left: 4%;
  margin-right: 4%;
  .name {
    display: inline-block;
  }
  .number {
    margin: 0 10px;
    color: #999;
  }
}
</style>
