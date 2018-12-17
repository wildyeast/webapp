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
    <svg class="dot" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100mm" height="100mm" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="a"><stop offset="0" stop-color="#ebe223"/><stop offset="1" stop-color="#ebe223" stop-opacity="0"/></linearGradient>
        <radialGradient xlink:href="#a" id="b" cx="50" cy="63.304" fx="50" fy="63.304" r="50" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 183.696)"></radialGradient>
      </defs>
      <circle cx="50" cy="247" r="50" fill="url(#b)" transform="translate(0 -197)" />
    </svg>
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
  height: calc(100vh - 64px - 80px); // 100vh - top-header height -
  position: relative;
  margin: 0 80px;
  .placeholder {
    top: 0;
    bottom: 0;
    position: absolute;
    height: calc(100%);
    width: 100%;
    background-color: $color-bright-bg;
  }
  .swiper-container {
    height: calc(100%);
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
          font-size: 8em;
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
  .dot {
    position: absolute;
    right: 0;
    transform: scale(1.2) translateX(-75px) translateY(-200px);
    z-index: 2;
  }
}
</style>
