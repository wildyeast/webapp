<template>
  <div v-editable="blok" class="mainstage">
    <div class="placeholder">
    </div>
    <div v-swiper:swiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="s._uid" v-for="s in blok.slides" :style="{ 'background-image': 'url(' + $resizeImage(s.image, '1600x0') + ')' }">
          <div class="wrapper">
            <span class="title" :class="{ 'dark': s.dark }">{{s.title}}</span>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.mainstage {
  height: calc(72vh - 64px); // 100vh - top-header height
  @include media-breakpoint-down(sm) {
    height: 60vh;
  }

  position: relative;
  @include margin-page-wide();
  z-index: 3;

  .placeholder {
    top: 0;
    bottom: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: $color-bright-bg;
  }
  .swiper-container {
    height: 100%;
    .swiper-slide {
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: flex-end;
      .wrapper {
        padding: 20px;
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title {
          font-size: 11.5vw;
          z-index: 9;
        }
        .teaser,
        .title {
          margin-bottom: 5px;
          padding: 5px 10px;
          display: block;
          color: #000;
          font-weight: bold;
          &.dark {
            color: #FFF;
          }
        }
      }
    }
  }
}
</style>
