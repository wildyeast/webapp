<template>
  <div v-editable="blok" class="about-teaser">
    <div class="teaser-content">
      <div class="col-start">
        <h2 v-if="blok.headline" class="headline">
          {{blok.headline}}
        </h2>
        <svg class="circle" xmlns="http://www.w3.org/2000/svg" width="10mm" height="10mm" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.758" fill="none" stroke-width=".5"/></svg>
        <svg class="dot" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100mm" height="100mm" viewBox="0 0 100 100"><defs><linearGradient id="a"><stop offset="0" stop-color="#ebe223"/><stop offset="1" stop-color="#ebe223" stop-opacity="0"/></linearGradient><radialGradient xlink:href="#a" id="b" cx="50" cy="63.304" fx="50" fy="63.304" r="50" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 183.696)"/></defs><circle cx="50" cy="247" r="50" fill="url(#b)" transform="translate(0 -197)"/></svg>
      </div>
      <div class="col-end">
        <p v-if="blok.text" class="text">
          <markdown :value="blok.text"></markdown>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.about-teaser {
  height: 100vh;
  color: #000;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  .teaser-content {
    max-width: 100%;
    flex-direction: column;
    position: relative;
    height: 75%;
    display: flex;
    .col-start {
      flex: 1;
      display: flex;
      align-items: flex-start;
      .headline {
        max-width: 50%;
        position: relative;
        margin: 5rem;
        font-size: 2.2rem;
        letter-spacing: 2px;
        line-height: 1.5;
        font-weight: bold;
        font-family: $font-secondary;
      }
      .circle {
        position: absolute;
        stroke: $color-yellow;
        left: 0;
        transform: scale(3) translateX(20px) translateY(20px);
        z-index: -1;
      }
      .dot {
        position: absolute;
        right: 0;
        transform: scale(1.2) translateX(-75px) translateY(-200px);
        z-index: 2;
      }
    }
    .col-end {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .text {
        max-width: 60%;
        padding-right: 90px;
        font-weight: normal;
        font-family: $font-primary;
        line-height: 2;
        font-size: 1.0rem;
        letter-spacing: 1.6px;
      }
    }
    /*
    .link {
      font-family: Helvetia, Arial;
      text-decoration: none;
      color: #00F;
      text-transform: uppercase;
      font-weight: bold;
      border: none;
      background: none;
      float: right;
      font-size: 1rem;
      padding: 5px 10px;
      cursor: pointer;
      &:hover,
      &:focus {
        outline: 1px solid #00F;
      }
    }
    */
  }
}
</style>
