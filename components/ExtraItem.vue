<template>
  <div v-editable="blok">
    <div class="content">
      <h2>{{blok.title}}</h2>
      <markdown v-if="blok.description" :value="blok.description"></markdown>
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
}
</style>
