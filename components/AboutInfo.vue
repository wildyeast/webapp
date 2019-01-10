<template>
  <div v-editable="blok" class="about-info">
    <div class="col-start">
      <div class="headline">
        {{blok.headline}}
      </div>
      <div class="list">
        <markdown :value="blok.list"></markdown>
      </div>
    </div>
    <div class="col-end">
      <div class="content">
        <markdown :value="blok.content"></markdown>
      </div>
      <div class="image-wrapper">
        <img class="image" :src="blok.image" alt=""/>
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

.about-info {
  display: flex;
  min-height: 100vh;
  position: relative;
  padding-top: 5rem;
  margin: 0 0 0 15%;
  .col-start {
    flex: 1;
    z-index: 2;
    .headline {
      padding: 0 3rem 3rem 3rem;
      color: $color-blue;
      font-weight: bold;
      font-size: 4.2vw;
      line-height: 1.2;
      letter-spacing: 0.03em;
      font-variant-ligatures: no-common-ligatures;
    }
    .list {
      background: #fff;
      padding: 5%;
      margin: 0 12%;
      font-weight: bold;
      color: $color-blue;
      font-size: 1.2rem;
      letter-spacing: .02em;
      font-variant-ligatures: no-common-ligatures;
      line-height: 1.2;
      ul {
        li {
          margin-bottom: 1.3em;
        }
      }
    }
  }
  .col-end {
    z-index: 1;
    flex: 1;
    .content {
      position: relative;
      z-index: 1;
      padding: 0 3rem;
      margin-bottom: -3%;
      font-size: 1rem;
      letter-spacing: .03em;
      line-height: 1.6;
      shape-outside: ellipse(20% 20% at 100% 100%);
    }
  }
  .image {
    position: relative;
    display: block;
    mix-blend-mode: multiply;
    width: 120%;
    margin-left: -20%;
    bottom: 0px;
  }
}
</style>
