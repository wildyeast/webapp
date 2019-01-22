<template>
  <nuxt-link :to="'/' + blok.full_slug">
    <div class="workshop-list-item">
      <div class="image">
        <img :src="$resizeImage(content.image, '320x320')" alt=""/>
      </div>
      <div class="body">
        <div class="title">
          {{content.title}}
        </div>
        <div class="subtitle">
          {{content.subtitle}}
        </div>
        <div class="teaser">
          {{content.teaser}}
        </div>
        <div class="trainer">
          {{content.trainer}}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    content() {
      return this.blok.content;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.workshop-list-item {
  color: #000;
  display: flex;
  margin-bottom: 25px;
  .image {
    flex: 1;
    max-width: 320px;
    img {
      display: block;
      width: 100%;
    }
  }
  .body {
    flex: 2;
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    padding: 20px;
    .title {
      font-family: $font-secondary;
      font-size: 1.8rem;
      margin-bottom: 10px;
    }
    .subtitle {
      font-family: $font-mono;
      font-size: 0.9em;
      margin-bottom: 20px;
      color: $color-orange;
    }
    .teaser {
      flex: 1;
      font-family: $font-mono;
      line-height: 1.2;
      font-size: 0.9rem;
    }
    .trainer {
      font-weight: bold;
    }
  }
}
</style>
