<template>
  <div v-editable="blok" class="intro-list">
    <div class="content">
      <div class="primary-col">
        <div class="headline">
          <h3 class="headline-text">{{blok.headline}}</h3>
        </div>
        <div class="dashed-line-blue"></div>
        <div class="intro-items">
          <div
            class="intro-item-title"
            :class="(selected == i._uid ? 'is-selected' : '')"
            v-for="i in blok.items"
            @click="updateSelected(i)">
              <div class="text">
                {{i.title}}
              </div>
              <div class="arrow">
              </div>
          </div>
        </div>
      </div>
      <div class="secondary-col">
        <div class="intro-text">
          <transition name="fadefromleft">
            <div v-for="(i, k) in blok.items" :key="k" v-if="selected == i._uid" class="intro-item-text">
                {{i.text}}
            </div>
          </transition>
        </div>
        <img class="intro-bg-image" :class="(selected ? 'has-content' : '')" :src="$resizeImage(blok.image, '700x0')" :alt="blok.headline">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  created() {
  },
  data() {
    return {
      selected: null
    }
  },
  methods: {
    updateSelected(e) {
      this.selected = e._uid;
    }
  }

}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
.intro-list {
  background-image: url(~assets/img/intro-list-3d-object.svg);
  background-size: 30vh;
  background-repeat: no-repeat;
  background-position: bottom left;
  .content {
    display: flex;
    align-items: flex-start;
    @include margin-page-wide();
    margin-top: -20%;
    .primary-col, .secondary-col {
      flex-grow: 1;
      @include media-breakpoint-up(md) {
        width: 50%;
      }
      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }
    @include media-breakpoint-down(sm) {
      margin: 0;
      flex-direction: column;
    }
    .primary-col {
      .headline {
        background: $color-blue-intro;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 50% 5% 5%;
        .headline-text {
          text-transform: uppercase;
          margin: 0;
          font-size: 4vw;
          line-height: 1.3;
          width: 5em;
        }
        @include media-breakpoint-down(sm) {
          height: 30vh;
          padding: 5%;
          .headline-text {
            font-size: 2rem;
            letter-spacing: .05rem;
          }
        }

      }
      .intro-items {
        margin: 3vh 0 30vh 20%;
        @include media-breakpoint-down(sm) {
          margin: 5vh 0 0 20%;
          height: 30vh;
        }
        .intro-item-title {
          display: flex;
          padding: 2vh 0;
          justify-content: stretch;
          cursor: pointer;
          font-size: 1.2vw;
          letter-spacing: 0.03em;
          transition: color .3s linear;
          .arrow {
            transition: all .3s linear;
            border-top: 0.1vw solid $color-blue-intro;
            margin: 0.6vw 10% 0 3%;
            width: 0%;
          }
          &:hover {
            color: $color-blue-intro;
          }
          &.is-selected {
            .arrow {
              display: block;
              align-self: stretch;
              position: relative;
              width: 10px;
              flex-grow: 1;
              &:before {
                content: "";
                top: 0;
                right: 0;
                position: absolute;
                border-top: 0.1vw solid $color-blue-intro;
                border-right: 0.1vw solid $color-blue-intro;
                width: 0.4vw;
                height: 0.4vw;
                transform: rotate(45deg);
                transform-origin: top right;
                margin-top: -.05vw;
                margin-right: -.05vw;
              }
            }
          }
        }
      }
      .dashed-line-blue {
        background-image: url(~assets/img/dashed-bg-blue.svg);
        background-size: 100% auto;
        background-position: 0 -10px;
        background-repeat: repeat-y;
        background-size: 1.8vw;
        @include media-breakpoint-up(md) {
          height: 1800px;
        }
        @include media-breakpoint-down(sm) {
          background-size: 12px;
          height: 100vh;
        }
        width: 2%;
        position: absolute;
        left: 10%;
      }
    }
    .secondary-col {
      position: relative;
      margin-top: 20%;
      overflow: hidden;
      @include media-breakpoint-down(sm) {
        margin: 0;
        height: 40vh;
      }

      .intro-bg-image {
        max-width: 100%;
        transition: opacity .2s linear;
        z-index: 1;
        width: 100%;
        &.has-content {
          opacity: .2;
        }
      }
      .intro-text {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        .intro-item-text {
          position: absolute;
          padding: 0 15%;
          line-height: 1.5;
          font-size: 1.6vw;
          font-weight: 700;
        }
      }
    }
  }
  .fadefromleft-enter-active, .fadefromleft-leave-active {
    transition: all .3s;
  }
  .fadefromleft-enter, .fadefromleft-leave-to {
    opacity: 0;
    transform: translateX(-50vw);
  }
}
</style>
