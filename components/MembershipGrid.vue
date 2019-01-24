<template>
  <div v-editable="blok" class="membership-grid">

    <div class="membership-info">
      <div v-if="blok.title" class="title">
        {{blok.title}}
      </div>

      <div class="info" v-if="blok.info">
        <markdown :value="blok.info"></markdown>
      </div>

      <div class="image">
        <img :src="$resizeImage(blok.image, '500x0')" alt=""/>
      </div>
    </div>
    <div class="membership-details">
      <div class="priceTabs">
        <div @click="setPriceView('monthly')">
          monthly
        </div>
        <div @click="setPriceView('annually')">
          annualy
        </div>
      </div>
      <div class="membership-plans">
        <component :key="blok.uid" v-for="blok in blok.columns" :blok="blok" :priceView="priceView" :is="blok.component"></component>
      </div>
      <div class="register-button" v-if="!hasUser">
        <button @click="register">Jetzt Mitglied werden</button>
      </div>
      <div v-if="blok.plans_text" class="plans-text">
        <markdown :value="blok.plans_text"></markdown>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  props: ['blok'],
  data() {
    return {
      priceView: 'monthly'
    }
  },
  methods: {
    setPriceView(v) {
      this.priceView = v;
    },
    register() {
      this.$store.dispatch('setSidebar', 'register');
    }
  },
  computed: {
    hasUser() {
      return !!this.$store.state.user;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.membership-grid {
  margin: 10vh 0 10vh;
  display: flex;
  .membership-info {
    margin-left: 3%;
    flex-grow: 1;
    .title {
      position: relative;
      font-size: 2.8rem;
      line-height: 1.3;
      font-weight: bold;
      font-family: $font-primary;
      letter-spacing: .05em;
      text-transform: uppercase;
      width: 50%;
    }
    .image {
      flex: 1;
      img {
        display: block;
        max-width: 100%;
        height: auto;
        max-height: 30vh;
      }
    }
    .info {
      margin-top: 0;
      padding: 0;
      width: 80%;
      font-size: 1rem;
      letter-spacing: 0.03em;
      line-height: 1.4;
    }

  }
  .membership-details {
    flex-grow: 3;
    .membership-plans {
      display: grid;
      grid-column-gap: 1vw;
      grid-template-columns: 1fr 1fr;
    }
    .register-button {
      text-align: center;
      button {
        outline: none;
        cursor: pointer;
        font-size: 1.2em;
        font-weight: bold;
        color: #FFF;
        border: none;
        padding: 15px;
        background-color: $color-orange;
        margin: 1.5em 0;
      }
    }
    .plans-text {
      position: relative;
      &:before {
        content: "*";
        font-family: $font-mono;
        font-size: 4em;
        position: absolute;
        left: -.6em;
        top: -.6em;
        color: $color-orange;
      }
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 2em 3em;
      max-width: 85%;
      color: #444;
    }
  }
}
</style>
