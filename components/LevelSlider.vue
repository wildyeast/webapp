<template>
  <div class="level-slider">
    <div class="level-container">
      <div v-for="(level, index) in blok.levels" v-bind:key="index" v-on:click="setLevel(index)">
        <level-item
          :key="level._uid"
          :blok="level"
          :number="blok.levels.length - 1 - index"
          :active="index === activeLevel"
        />
      </div>
    </div>

    <div class="image-container">
      <img
        class="image"
        v-for="(level, index) in blok.levels"
        v-bind:key="level._uid"
        v-show="index === activeLevel"
        v-bind:src="level.image"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],

  data() {
    return {
      activeLevel: 0,
      imageStyle: ""
    };
  },

  created() {
    this.$watch("activeLevel", this.setImage);
    this.setImage();
  },

  methods: {
    setLevel(newVal) {
      this.activeLevel = newVal;
    },

    setImage() {
      this.imageStyle = {
        backgroundImage: `url("https:${
          this.blok.levels[this.activeLevel].image
        }")`
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.level-slider {
  margin: 10px 0;
  border: 6px solid #000;
  border-left: none;
  border-right: none;
  overflow: hidden;

  .level-container {
    padding: 20px 0;
    border-bottom: 2px dashed #000;
  }

  .image-container {
    background-color: #fff;
    overflow: hidden;

    .image {
      width: 100%;
    }
  }
}

@media (min-width: $mobile-large) {
  .level-slider {
    margin: 10px 30px 10px 0;
    display: flex;
    border-right: 6px solid #000;

    .level-container {
      width: max-content;
      border-right: 2px dashed #000;
      border-bottom: none;
    }
  }
}
</style>

