<template>
  <div v-editable="blok" class="workshop-info">
    <div class="teaser-content">
      <div class="col-start">
        <h2 v-if="blok.title" class="headline">
          {{blok.title}}
        </h2>
      </div>
      <div class="col-end">
        <p v-if="blok.teaser" class="text">
          {{blok.teaser}}
        </p>
      </div>
      <div class="col-end">
        <a v-if="blok.link" :href="blok.link.cached_url" target="_blank">Termine und Anmeldung</a>
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

.workshop-info {
  color: #000;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  .teaser-content {
    max-width: 100%;
    margin: 0 100px;
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
        font-size: 2.8rem;
        line-height: 1.5;
        font-weight: bold;
        font-family: $font-secondary;
      }
    }
    .col-end {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .text {
        max-width: 75%;
        font-weight: normal;
        font-family: $font-primary;
        line-height: 1.8;
        font-size: 1.1rem;
      }
    }
  }
}
</style>
