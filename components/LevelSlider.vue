<template>
  <div class="level-slider" v-bind:style="{backgroundImage: this.image}">
    <div class="level-container">
      <div
        v-for="(level, index) in blok.levels"
        v-bind:key="index"
        v-on:click="setLevel(index)"
      >
        <component
          :key="level._uid"
          :blok="level"
          :is="level.component"
          :number="blok.levels.length - 1 - index"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],

  data() {
    return {
      level: 0,
      image: ""
    };
  },

  created() {
    this.$watch("level", this.setImage);
    this.setImage();
  },

  methods: {
    setLevel(newVal) {
      this.level = newVal;
      this.image = this.blok.levels[this.level].image;
    },

    setImage() {
      this.image = `url("https:${this.blok.levels[this.level].image}")`;
    }
  }
};
</script>

<style lang="scss">
.level-slider {
  margin: 10px;
  border: 6px solid #000;
  background-repeat: no-repeat;
  // background-size: 50%;
  background-size: contain;
  // background-size: cover;
  background-position: center center;
  background-color: #fff;

  .level-container {
    padding: 20px 0;
    width: max-content;
    // background-color: rgba(255, 255, 255, .2);
    // background-color: rgba(0, 0, 0, .4);
  }
}
</style>

