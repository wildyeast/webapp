<template>
  <div v-editable="blok" class="col">
    <div class="plan">
      <h2 class="title">{{ blok.name }}</h2>
      <ul class="feature-list">
        <li class="feature" v-for="item in blok.features" :key="item._uid">{{item.text}}</li>
      </ul>
      <div class="price">
        <h4 class="title">Ermäßigt</h4>
        <div class="pricetag">{{blok.price_regular}},- / Monat</div>
      </div>
      <div class="price">
        <h4 class="title">Regulär</h4>
        <div class="pricetag">{{blok.price_reduced}},- / Monat</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  methods: {
    register() {
      this.$store.dispatch('setSidebar', 'register');
    }
  },
  computed: {
    registerLink() {
      return '#';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.col {
  .plan {
    /*border: 4px solid #eee;*/
    margin: 15px;
    padding: 25px;
    background-color: #FFF;
    width: 35vh;
    h2.title {
      font-weight: normal;
      margin: 0;
      font-family: $font-secondary;
      color: $color-blue-alt;
    }
    ul.feature-list {
      margin: 10px 0;
      list-style-type: none;
      padding: 10px 0;
      li.feature {
        padding: 10px 0;
        font-size: 0.8rem;
        font-family: $font-mono;
        border-bottom: 1px solid #aaa;
        line-height: 1.5em;
        &:last-child {
          border: none;
        }
      }
    }
    .price {
      margin: 15px 0;
      .title {
        margin: 5px 0;
        text-transform: uppercase;
        font-family: $font-secondary;
        font-size: 0.6rem;
      }
      .pricetag {
        outline: none;
        border: none;
        font-weight: bold;
        font-size: 0.8rem;
        display: block;
        width: 100%;
        text-decoration: none;
        padding: 10px;
        color: $color-orange;
        background: $color-bright-bg;
        text-align: center;
      }
    }
  }
}
</style>
