<template>
  <div class="covidInfobox">
    <div class="boxContainer">
      <font-awesome-icon class="icon" icon="exclamation-triangle" />
      <div class="box">
        <div class="title">
          Covid Info
        </div>
        <div class="text">
          Text
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
.covidInfobox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  & .boxContainer {
    & .icon {
      position: absolute;
      font-size: 13em;
      margin-left: 1rem;
      margin-top: -1rem;
      color: $color-bright-bg;
      @include media-breakpoint-down(sm) {
        filter: opacity(0.3);
        margin-top: -3rem;
      }
    }
    & .box {
      display: flex;
      flex-direction: column;
      background-color: $color-yellow;
      width: 40em;
      @include media-breakpoint-down(sm) {
        width: 100%;
      }
      height: 10em;
      padding: 1em;
      border: 5px dashed black;
      margin: 2em;
      @include media-breakpoint-down(sm) {
        width: 95vw;
        margin: 0.3em;
      }
      & .title {
        font-family: monospace;
        font-size: 1.5em;
        text-align: center;
      }
      & .text {
        margin-top: 1em;
        margin-left: 15em;
        @include media-breakpoint-down(sm) {
          margin: 0;
          z-index: 2;
        }
      }
    }
  }
}
</style>