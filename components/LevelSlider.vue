<template>
  <div class="level-slider">
    <div class="level-container">
      <div v-for="(level, index) in blok.levels" v-bind:key="index" v-on:click="setLevel(index)">
        <component
          :key="level._uid"
          :blok="level"
          :is="level.component"
          :number="blok.levels.length - 1 - index"
        />
      </div>
    </div>

    <div class="image-container" v-bind:style="imageStyle" />
  </div>
</template>

<script>
// !! Images not being cached!

export default {
  props: ["blok"],

  data() {
    return {
      level: 0,
      imageStyle: ""
    };
  },

  created() {
    this.$watch("level", this.setImage);
    this.setImage();
  },

  methods: {
    setLevel(newVal) {
      this.level = newVal;
    },

    setImage() {
      this.imageStyle = {
        backgroundImage: `url("https:${this.blok.levels[this.level].image}")`
      };
    }
  }
};
</script>

<style lang="scss">
.level-slider {
  margin: 10px;
  border: 6px solid #000;
  display: flex;

  .level-container {
    padding: 20px 0;
    width: max-content;
    border-right: 2px dashed #000;
  }

  .image-container {
    background-repeat: no-repeat;
    background-size: contain;
    // background-size: cover;
    background-position: center center;
    background-color: #fff;
    width: 100%;
  }
}
</style>

