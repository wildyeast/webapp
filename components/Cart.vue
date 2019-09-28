<template>
  <div class="cart">
  <div class="header-item">
      <div class="space">
        <div class="headline">Dein Warenkorb</div>
        <!--
        <div class="subtitle" @click="register">
          Noch kein Mitglied? Hier anmelden.
        </div>
        -->
      </div>
      <div class="close" @click="close">
        <svg class="close-icon" viewBox="0 0 32 32">
          <g>
            <path d="M 5.5488281 3.8535156 A 2.0002 2.0002 0 0 0 4.15625 7.2890625 L 13.388672 16.519531 L 4.15625 25.751953 A 2.0002 2.0002 0 1 0 6.984375 28.580078 L 16.216797 19.347656 L 25.449219 28.580078 A 2.0002 2.0002 0 1 0 28.277344 25.751953 L 19.044922 16.519531 L 28.277344 7.2890625 A 2.0002 2.0002 0 0 0 26.824219 3.8554688 A 2.0002 2.0002 0 0 0 25.449219 4.4589844 L 16.216797 13.691406 L 6.984375 4.4589844 A 2.0002 2.0002 0 0 0 5.5488281 3.8535156 z " />
          </g>
        </svg>
      </div>
    </div>

    <LineItems v-if="hasItems" />
    <div v-else>
      <span>Dein Warenkorb ist leer</span>
    </div>

    <footer>
      <div class="info">
        <div class="info__total info--small">Subtotal</div>
        <div class="info__pricing">
          <span class="pricing">{{ $store.state.checkout.subtotalPrice }}</span>
        </div>
      </div>
      <div class="info">
        <div class="info__total info--small">Taxes</div>
        <div class="info__pricing">
          <span class="pricing">{{ $store.state.checkout.totalTax }}</span>
        </div>
      </div>
      <div class="info">
        <div class="info__total info--small">Total</div>
        <div class="info__pricing">
          <span class="pricing">{{ $store.state.checkout.totalPrice }}</span>
        </div>
      </div>
      <a :href="$store.state.checkout.webUrl" class="checkout button">Checkout</a>
    </footer>
  </div>
</template>

<script>
import LineItems from "~/components/LineItems";

export default {
  components: {
    LineItems
  },
  methods: {
    close() {
      this.$store.dispatch('setSidebar', null);
    },
  },
  computed: {
    hasItems() {
      return this.items && this.items !== undefined && this.items.length > 0;
    },
    items() {
      return this.$store.state.checkout.lineItems;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.cart {
  padding: 5vw;
  background-color: $color-bright-bg;
  .header-item {
    margin-bottom: 40px;
    display: flex;
    & > div {
      &.space {
        flex: 1;
      }
      &.close {
        margin-left: 2em;
        .close-icon {
          cursor: pointer;
          height: 1.1em;
        }
      }
    }
    .headline {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 15px;
      font-family: $font-secondary;
    }
    .subtitle {
      font-size: 0.9rem;
      color: $color-orange;
      font-family: $font-mono;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .form-item {
    padding: 0 0 18px;
    display: grid;
    @include media-breakpoint-up(sm) {
      grid-template-columns: 28% 72%;
    }
    align-items: center;
    .label {
      font-weight: bold;
      text-transform: uppercase;
      font-size: .7em;
    }
    .input {
      outline: none;
      border: 1px solid #fff;
      flex-grow: 1;
      padding: 5px 10px;
      @include media-breakpoint-down(xs) {
        margin: 1vh 0;
      }
      &:focus {
        border-color: $color-orange;
      }
    }
    &.button-row {
      display: flex;
      justify-content: flex-end;
    }
    button {
      cursor: pointer;
      background-color: $color-orange;
      color: #FFF;
      min-width: 30%;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 12px 8px;
      line-height: 1;
      outline: none;
      &:focus {
        background-color: lighten($color-orange, 10);
      }
    }
  }
  .checkbox-item {
    padding: 10px;
    display: flex;
    .checkbox-wrapper {
      padding-right: 20px;
      outline: none;
      text-align: right;
      user-select: none;
      flex: 1;
      max-width: 180px;
    }
    label {
      user-select: none;
    }
  }
  .error-message {
    font-size: 14px;
    font-family: $font-mono;
    padding: 5px 0;
    display: flex;
    color: red;
  }
}

</style>
