<template>
  <div class="level-slider">
    <div
      v-for="(level, index) in blok.levels"
      v-bind:key="index"
      v-on:click="setLevel(blok.levels.length - 1 - index)"
    >
      <component
        :key="level._uid"
        :blok="level"
        :is="level.component"
        :number="blok.levels.length - 1 - index"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],

  // !!
  // !!
  // !!
  // !!

  data() {
    return {
      level: 0
    };
  },

  created() {
    this.$watch("level", this.update);
  },

  methods: {
    setLevel(newVal) {
      this.level = newVal;
    },
  }
};
</script>

<style lang="scss">
.level-slider {
  margin: 10px;
  border: 6px solid #000;
  padding: 20px 0 10px 0;
}
</style>

