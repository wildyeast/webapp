<template>
  <transition name="fade">
    <div class="modal" @click="close">
      <div class="container">
        <div class="top">
          <font-awesome-icon v-if="icon" class="icon" icon="exclamation-triangle" />
          <div class="title">{{ title }}</div>
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="buttons">
          <button class="input-button-primary" @click="close">OK</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: null
    }
  },
  mounted () {
    window.addEventListener('scroll', this.close)
  },
  methods: {
    close () {
      this.$emit('close')
      sessionStorage.setItem('hasSeenPopup', 'true')
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/styles.scss";
.modal {
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw !important;
  height: 100vh !important;
  background: repeating-linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 0.3) 70px,
          rgba(0, 0, 0, 0.8) 70px,
          rgba(0, 0, 0, 0.8) 140px
  );
  & .container {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: -20em;
    border: 5px dashed black;
    padding: 1em;
    background: $color-yellow;
    width: 40em;
    height: 18em;
    text-align: center;
    @include media-breakpoint-down(sm) {
      margin: 0 0.5em;
      height: 25em;
    }
    & .top {
      display: flex;
      flex-flow: row nowrap;
      & .icon {
        font-size: 6em;
      }
      & .title {
        width: 100%;
        font-size: 2em !important;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3em;
        font-family: monospace;
        margin-bottom: 1em;
      }
    }
    & .content {
      justify-content: flex-start;
      padding: 1em;
      font-size: 1.3em;
    }
    & .buttons {
      position: absolute;
      bottom: 1em;
      right: 1em;
    }
  }
}
</style>