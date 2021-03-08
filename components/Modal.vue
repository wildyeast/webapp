<template>
  <transition name="fade">
    <div class="modal" @click="close">
      <div class="content">
        <div class="title">{{ title }}</div>
        <slot />
        <div class="buttons">

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
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
.modal {
  position: absolute;
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
  & .content {
    margin-top: -20em;
    border: 1px solid black;
    border-radius: 0.3em;
    padding: 1em;
    background: $color-yellow;
    width: 40em;
    height: 20em;
    & .title {
      font-weight: bold;
      font-size: 1.3em;
      margin-bottom: 1em;
    }
  }
}
</style>