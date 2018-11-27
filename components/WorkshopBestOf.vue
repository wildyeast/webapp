<template>
  <div v-editable="blok" class="workshop-best-of">
    <div class="header">
      <h2 class="headline">{{blok.headline}}</h2>
      <div class="subline">
        <code class="hr">{{blok.subline}}</code>
        <sb-link :link="blok.link">Alle Kurse</sb-link>
      </div>
    </div>
    <div class="grid">
      <workshop-preview class="col" v-for="w in blok.workshops" :key="w" :id="w"></workshop-preview>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.workshop-best-of {
  padding-top: 40px;
  .header {
    padding: 0 100px;
    .headline {
      margin: 0;
      margin-bottom: 30px;
      max-width: 40%;
      font-size: 3rem;
      text-transform: uppercase;
      flex: 1;
    }
    .subline {
      color: $color-orange;
      display: flex;
      .hr {
        flex: 1;
      }
      .link {
        font-size: 1.3rem;
        font-family: $font-secondary;
        text-decoration: none;
        color: #000;
      }
    }
  }
  .grid {
    padding: 100px;
    .col {
      display: inline-block;
      width: 50%;
    }
  }
}
</style>
