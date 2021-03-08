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
    }
    & .box {
      display: flex;
      flex-direction: column;
      background-color: $color-yellow;
      width: 40em;
      height: 10em;
      padding: 1em;
      border: 5px dashed black;
      margin: 2em;
      & .title {
        font-family: monospace;
        font-size: 1.5em;
        text-align: center;
      }
      & .text {
        margin-top: 1em;
        margin-left: 15em;
      }
    }
  }
}
</style>