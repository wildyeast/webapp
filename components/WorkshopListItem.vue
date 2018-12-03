<template>
  <div class="workshop-list-item">
    <div class="image">
      <img :src="blok.image" alt=""/>
    </div>
    <div class="body">
      <div class="title">
        {{blok.title}}
      </div>
      <div class="info">
        {{blok.info}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  data() {
    return {
      story: null,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.workshop-list-item {
  display: flex;
  margin-bottom: 25px;
  .image {
    flex: 1;
    img {
      display: block;
      width: 100%;
    }
  }
  .body {
    flex: 2;
    background-color: #FFF;
    padding: 20px;
    .title {
      font-family: $font-secondary;
      font-size: 1.8rem;
      margin-bottom: 20px;
    }
    .info {
      font-family: $font-mono;
      line-height: 1.2;
    }
  }
}
</style>
