<template>
  <div class="nav-item">
    <!-- if item has children -->
    <div
      v-if="item.children && item.children.length > 0"
      class="main-nav-item">
      <div class="level-entry" @click="openLayer()">
        {{ item.name }}
      </div>
      <transition name="fadefromright" v-if="item.children && item.children.length > 0">
        <div :key="item._uid" class="nav-layer" v-if="active">
          <div class="level-header">
            <div class="levelUp" @click="closeLayer()"><</div>
            <div class="close" @click="closeNav()">X</div>
          </div>
          <sb-link :link="item.link" class="child-nav-item main-item">
            <div>{{ item.name }}</div>
          </sb-link>
          <div v-for="child in item.children" :key="child.id" class="child">
            <sb-link :link="child.link" class="child-nav-item">
              {{ child.name }}
            </sb-link>
          </div>
        </div>
      </transition>
    </div>
    <!-- else -->
    <sb-link v-else :link="item.link" class="main-nav-item">
      {{ item.name }}
    </sb-link>
  </div>
</template>

<script charset="utf-8">
export default {
  props: ['item'],
  data() {
    return {
      active: false
    }
  },
  methods: {
    openLayer() {
      this.active = true;
    },
    closeLayer() {
      this.active = false;
    },
    closeNav() {
      this.active = false;
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.nav-item {
  display: flex;
  flex-direction: column;
  .main-nav-item, .child-nav-item {
    display: block;
    padding: 3vh 4%;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: .08em;
    &.nuxt-link-active {
      color: $color-orange;
    }
  }
  .main-nav-item {
    color: #000;
    cursor: pointer;
    .level-entry {
      position: relative;
      &:before {
        position: absolute;
        content: "";
        border-top: #000 0.15em solid;
        border-right: #000 0.15em solid;
        transform: rotateZ(45deg);
        transform-origin: top right;
        height: .3em;
        width: .3em;
        margin-top: .4em;
        right: 4%;
      }
    }
    .child-nav-item {
      color: #fff;
      &.nuxt-link-active {
        color: $color-yellow;
      }
    }
    .nav-layer {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: $color-blue;
      color: #fff;
      .level-header {
        display: flex;
        justify-content: space-between;
        .levelUp {
          padding: 3vh 4%;
        }
        .close {
          padding: 3vh 4%;
        }
      }
    }
  }


  .fadefromright-enter-active, .fadefromright-leave-active {
    transition: all .3s;
  }
  .fadefromright-enter, .fadefromright-leave-to {
    opacity: 0;
    transform: translateX(50vw);
  }
}

</style>
