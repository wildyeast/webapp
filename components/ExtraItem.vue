<template>
  <div v-editable="blok">
    <div class="content">
      <h2 class="title">{{blok.title}}</h2>
      <markdown class="text" v-if="blok.description" :value="blok.description"></markdown>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.content {
  background-color: #FFF;
  padding: 1.5em;
  box-shadow: darken($color-bright-bg,5%) 10px 8px;
  .title {
    font-weight: normal;
    margin: 0;
    font-family: $font-secondary;
    color: #0069aa;
    min-height: 2em;
  }
  .text {
    font-size: 1rem;
    letter-spacing: 0.03em;
    line-height: 1.4;
  }
}
</style>
