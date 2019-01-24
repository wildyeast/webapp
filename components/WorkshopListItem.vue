<template>
  <nuxt-link :to="'/' + blok.full_slug">
    <div class="workshop-list-item">
      <div class="image">
        <img :src="$resizeImage(content.image, '320x320')" alt=""/>
      </div>
      <div class="body">
        <div class="subtitle">
          {{content.subtitle}}
        </div>
        <div class="title">
          {{content.title}}
        </div>
        <div class="teaser">
          {{content.teaser}}
        </div>
        <div class="trainer">
          {{content.trainer}}
        </div>
        <div class="linktext">
          <div class="link-arrow"></div>
          <div>{{linktext}}</div>
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
    },
    linktext() {
      return "Mehr Infos";
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
    img {
      max-height: calc(40vh - 65px);
      display: block;
    }
  }
  .body {
    flex: 2;
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    padding: 1.5rem;
    .title {
      font-family: $font-secondary;
      font-size: 2rem;
      margin-bottom: .4rem;
    }
    .subtitle {
      font-family: $font-mono;
      font-size: 0.9rem;
      letter-spacing: .1em;
      margin-bottom: .3rem;
      text-transform: uppercase;
      color: $color-orange;
    }
    .teaser {
      flex: 1;
      font-family: $font-mono;
      line-height: 1.6;
      font-size: 0.9rem;
      width: 80%;
    }
    .trainer {
      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;
      margin: .4em 0;
    }
    .linktext {
      text-transform: uppercase;
      color: $color-blue;
      margin: 1em 0 .5em;
      display: flex;
      align-items: center;
      .link-arrow {
        border-top: $color-blue 1px solid;
        width: 1em;
        position: relative;
        margin-right: .3em;
        &:before {
          position: absolute;
          right: 0;
          content: "";
          border-top: $color-blue 1px solid;
          border-right: $color-blue 1px solid;
          transform: rotateZ(45deg);
          transform-origin: top right;
          height: .3em;
          width: .3em;
          margin-top: -.5px;
        }

      }
    }
  }
}
</style>
