<template>
  <div class="level-description">
    <!-- .level-indicator content must be loaded from storyblok language -->
    <h3 class="level-indicator">Ebene</h3>
    <h1 class="number">{{number}}</h1>
    <div class="text">
      <h2 class="title">{{blok.title}}</h2>
      <img class="arrow" src="~/assets/img/arrow-right.svg">
    </div>
    <h3 class="areas">{{blok.subtitle}}</h3>
  </div>
</template>

<script>
export default {
  props: ["blok", "number"],
};
</script>

<style lang="scss">
.level-description {
  display: flex;
  margin-bottom: 20px;

  .number {
    font-size: 80px;
    margin: 0;
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
    font-size: 12px;
    margin-left: 10px;
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

