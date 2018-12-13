<template>
  <transition name="fade">
  <div class="sidebar" v-if="sidebar">
    <div class="backdrop" @click="close"></div>
    <div class="content">
      <transition name="slide">
      <login-form v-if="sidebar == 'login'"></login-form>
      <register-form v-else-if="sidebar == 'register'"></register-form>
      </transition>
    </div>
  </div>
  </transition>
</template>

<script charset="utf-8">
export default {
  created() {
  },
  methods: {
    close() {
      this.$store.dispatch('setSidebar', null);
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.sidebar {
  position: fixed;
  z-index: 5000;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  .backdrop {
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .content {
    padding: 50px;
    flex-basis: 500px;
    background-color: $color-bright-bg;
  }
}
</style>
