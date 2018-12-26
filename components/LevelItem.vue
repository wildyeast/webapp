<template>
  <div class="level-description">
    <!-- .level-indicator content must be loaded from storyblok language -->
    <h3 class="level-indicator">Ebene</h3>
    <h1 class="number">{{number}}</h1>
    <div class="text">
      <h2 class="title">{{blok.title}}</h2>
      <img v-if="blok.areas" class="arrow" src="~/assets/img/arrow-right.svg">
    </div>
    <div v-if="blok.areas" class="areas">
      <h3 class="area" v-for="(area, index) in blok.areas.split(',')" v-bind:key="index">
        {{area}}
        <br>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok", "number"]
};
</script>

<style lang="scss">
@import "~/assets/scss/styles.scss";

.level-description {
  display: flex;
  margin-bottom: 10px;

  .number {
    font-size: 80px;
    margin: 0;
    // font-family: $font-mono; // !! font from design missng
  }

  .level-indicator {
    margin: 0;
    font-size: 14px;
    border-bottom: 1px solid #000;
    margin-top: 60px;
    margin-right: 20px;
    padding-left: 4px;
  }

  .areas {
    margin-top: 20px;

    .area {
      font-size: 12px;
      margin: 0 0 4px 10px;
    }
  }

  .text {
    margin-left: 15px;

    .title {
      font-size: 18px;
      margin-top: 5px;
      margin-bottom: 0;
    }

    .arrow {
      width: 180px;
    }
  }
}
</style>

