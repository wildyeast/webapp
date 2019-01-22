<template>
  <!--
  <nuxt-link :to="'/' + blok.full_slug">
  -->
    <div class="workshop-list-item">
      <div class="image">
        <img :src="$resizeImage(content.image, '320x0')" alt=""/>
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
        <div class="cta">
          <nuxt-link :to="'/' + blok.full_slug">
            Mehr Info
          </nuxt-link>
        </div>
      </div>
    </div>
    <!--
  </nuxt-link>
    -->
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
/*
a {
  text-decoration: none;
  color: #000;
  &:active,
  &:focus {
    color: #000;
  }
}
*/

.workshop-list-item {
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
    background-color: #FFF;
    padding: 20px;
    .title {
      font-family: $font-secondary;
      font-size: 1.8rem;
      margin-bottom: 10px;
    }
    .subtitle {
      margin-bottom: 20px;
    }
    .teaser {
      font-family: $font-mono;
      line-height: 1.2;
      font-size: 0.9rem;
    }
    .cta {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.9rem;
      font-family: $font-secondary;
      letter-spacing: 0.05rem;
      padding: 25px 0;
      a {
        color: $color-blue;
        text-decoration: none;
      }
    }
  }
}
</style>
