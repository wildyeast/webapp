<template>
  <div class="level-slider">
    <component
      v-for="(level, index) in blok.levels"
      :key="level._uid"
      :blok="level"
      :is="level.component"
      :number="blok.levels.length - 1 - index"
    />
  </div>
</template>

<script>
export default {
  props: ["blok"]
};
</script>

<style lang="scss">
  .level-slider {
    margin: 10px;
    border: 6px solid #000;
    padding: 20px 0 10px 0;
  }
</style>

