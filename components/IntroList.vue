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
          <div v-for="i in blok.items" v-if="selected == i._uid" class="intro-item-text">
            {{i.text}}
          </div>
        </div>
        <img class="intro-bg-image" :class="(selected ? 'has-content' : '')" :src="blok.image" :alt="blok.headline">
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
$color-blue-intro: #005eff;
.intro-list {
  background-image: url(~assets/img/intro-list-3d-object.svg);
  background-size: 30vh;
  background-repeat: no-repeat;
  background-position: bottom left;
  .content {
    display: flex;
    align-items: flex-start;
    @include margin-page-wide();
    margin-top: -10%;
    .primary-col, .secondary-col {
      flex-grow: 1;
      width: 50%;
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
          font-size: 3rem;
          width: 5em;
        }
      }
      .intro-items {
        margin: 20px 0 30vh 20%;
        .intro-item-title {
          display: flex;
          padding: 1rem 0;
          justify-content: stretch;
          cursor: pointer;
          &.is-selected {
            .arrow {
              border-top: 2px solid $color-blue-intro;
              align-self: stretch;
              position: relative;
              width: 10px;
              display: block;
              &:before {
                content: "";
                top: 0;
                right: 0;
                position: absolute;
                border-top: 2px solid $color-blue-intro;
                border-right: 2px solid $color-blue-intro;
                width: 7px;
                height: 7px;
                transform: rotate(45deg);
                transform-origin: top right;
                margin-top: -1px;
                margin-right: -1px;
              }
            }
          }
        }
      }
      .dashed-line-blue {
        background-image: url(~assets/img/dashed-bg-blue.svg);
        background-size: 100% auto;
        background-position: 0 -30px;
        height: 800px;
        width: 28px;
        position: absolute;
        left: 10%;
      }
    }
    .secondary-col {
      position: relative;
      margin-top: 10%;
      .intro-bg-image {
        max-width: 100%;
        transition: opacity .2s linear;
        z-index: 1;
        &.has-content {
          opacity: .3;
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
          padding: 15%;
        }
      }
    }
  }
}
</style>
