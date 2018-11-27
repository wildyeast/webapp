<template>
  <div v-editable="blok" class="membership-grid-wrapper">
    <div class="membership-grid">
      <component :key="blok.uid" v-for="blok in blok.columns" :blok="blok" :is="blok.component"></component>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>
.membership-grid-wrapper {
  min-height: 100vh;
  padding: 50px 0;
  display: flex;
  align-items: center;
  .membership-grid {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
