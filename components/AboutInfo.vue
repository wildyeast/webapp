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
    </div>
    <div class="image-wrapper">
      <img class="image" :src="blok.image" alt=""/>
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
  height: 100vh;
  position: relative;
  background-color: #FFF;
  padding-top: 5rem;
  margin: 0 -20px;
  .col-start {
    flex: 1;
    .headline {
      padding: 0 3rem 3rem 3rem;
      color: $color-blue;
      font-weight: bold;
      line-height: 70px;
      font-size: 3.5rem;
    }
    .list {
      padding-left: 5rem;
      font-weight: bold;
      color: $color-blue;
      font-size: 1.3rem;
      line-height: 1.2;
      ul {
        li {
          margin-bottom: 15px;
        }
      }
    }
  }
  .col-end {
    flex: 1;
    .content {
      position: relative;
      z-index: 1;
      padding: 3rem;
      line-height: 1.3;
    }
  }
  .image {
    position: absolute;
    display: block;
    width: 60%;
    right: -20px;
    bottom: 0px;
  }
}
</style>
