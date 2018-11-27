<template>
  <div v-editable="blok" class="location-descriptio">
    <div class="col-left">
      <markdown :value="blok.left"></markdown>
    </div>
    <div class="col-right">
      <markdown :value="blok.right"></markdown>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.location-description {
  display: flex;
  flex-direction: row;
  .col-left {
    flex: 1;
  }
  .col-right {
    flex: 3;
  }
}
</style>
