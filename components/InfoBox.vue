<template>
  <div v-editable="blok" class="info-box">
    <div class="box-content">
      <div class="row">
        <h2 v-if="blok.title" class="title">
          {{blok.title}}
        </h2>
      </div>
      <div class="row">
        <div class="col-image">
          <img :src="blok.image" alt=""/>
        </div>
        <div class="col-text">
          <markdown :value="blok.text"></markdown>
        </div>
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

.info-box {
  .box-content {
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    .title {
      position: relative;
      font-size: 2.8rem;
      line-height: 1.5;
      font-weight: bold;
      font-family: $font-primary;
      text-transform: uppercase;
      width: 50%;
    }
    .row {
      display: flex;
      .col-image {
        flex: 1;
        img {
          display: block;
          max-width: 100%;
          height: auto;
        }
      }
      .col-text {
        flex: 2;
        padding: 20px;
        p {
          font-size: 1.2rem;
          line-height: 1.2;
          margin-top: 0;
        }
      }
    }
  }
}

/*
.info-box {
  height: 100vh;
  color: #000;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  .box-content {
    position: relative;
    height: 100%;
    display: flex;
    .col-start {
      flex: 9;
      display: flex;
      align-items: flex-start;
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
      flex: 16;
      display: flex;
      align-items: flex-end;
      .text {
        padding: 5rem;
        font-weight: normal;
        font-family: $font-primary;
        line-height: 1.8;
        font-size: 1.1rem;
      }
    }
  }
}
*/
</style>
