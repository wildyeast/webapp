<template>
  <div
    v-editable="blok"
    class="grid"
  >
    <component
      :is="blok.component"
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.grid {
  display: flex;
  @include margin-page-wide();
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  justify-content: center;
}
</style>
