<template>
  <div v-editable="blok" class="text-blok">
    <div class="text">
      <markdown :value="blok.text"></markdown>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.text-blok {
  margin: 0 4%;
  display: flex;
  .text {
    flex: 1;
    display: flex;
    line-height: 1.5;
    font-size: 1.1rem;
    @include media-breakpoint-down(sm) {
      font-size: 1rem;
      line-height: 1.4;
    }
  }
}
</style>
