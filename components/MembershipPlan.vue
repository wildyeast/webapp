<template>
  <div v-editable="blok" class="col">
    <div class="plan">
      <h2 class="title">{{ blok.name }}</h2>
      <div class="pricewrapper" v-if="priceView == 'monthly'">
        <div class="price">
          <h4 class="title">Ermäßigt</h4>
          <div class="pricetag">{{blok.price_reduced}},- / Monat</div>
        </div>
        <div class="price">
          <h4 class="title">Regulär</h4>
          <div class="pricetag">{{blok.price_regular}},- / Monat</div>
        </div>
      </div>
      <div class="pricewrapper" v-if="priceView == 'annually'">
        <div class="price">
          <h4 class="title">Ermäßigt</h4>
          <div class="pricetag">{{blok.price_reduced_annually}},- / Jahr</div>
        </div>
        <div class="price">
          <h4 class="title">Regulär</h4>
          <div class="pricetag">{{blok.price_regular_annually}},- / Jahr</div>
        </div>
      </div>
      <ul class="feature-list">
        <li class="feature" v-for="item in blok.features" :key="item._uid">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok', 'priceView'],
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
  display: flex;
  justify-content: space-between;
  &:first-child {
    .plan {
    box-shadow: darken($color-bright-bg,5%) 10px 8px;
    }
  }
  &:last-child {
    .plan {
    box-shadow: darken($color-bright-bg,5%) 10px 8px;
    }
  }
  .plan {
    /*border: 4px solid #eee;*/
    padding: 3vw;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    h2.title {
      font-weight: normal;
      margin: 0;
      font-family: $font-secondary;
      color: $color-blue-alt;
      min-height: 2em;
    }
    ul.feature-list {
      margin: 10px 0;
      list-style-type: none;
      padding: 10px 0;
      flex-grow: 1;
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
    .pricewrapper {
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
}
</style>
