<template>
  <div class="breadcrumbs">
    <div class="content">
      <div class="item">
          GRAND GARAGE
      </div>
      <div v-for="i in pathItems" class="item">
        {{i}}
      </div>
      <div class="item last">
        {{lastItem}}
      </div>
    </div>
  </div>
</template>

<script charset="utf-8">
export default {
  created() {
  },
  methods: {
  },
  computed: {
    items() {
      let path = this.$store.state.route.fullPath.split('?')[0];
      let items = path.replace('-', ' ').split('/').slice(2);
      if (path.endsWith('/')) {
        items.pop();
      }
      return items;
    },
    pathItems() {
      let items = this.items.slice(0);
      items.pop();
      return items;
    },
    lastItem() {
      let i = this.items.pop();
      return i;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.breadcrumbs {
  z-index: 900;
  top: 0;
  position: fixed;
  background-color: $color-bright-bg;
  height: 100vh;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .content {
    white-space: nowrap;
    transform: rotate(-90deg);
    .item {
      font-size: 12px;
      text-transform: uppercase;
      font-weight: bold;
      display: inline-block;
      margin-right: 20px;
      &.last {
        color: $color-blue;
      }
      a {
        text-decoration: none;
        color: #000;
        &:hover {
          color: $color-blue;
        }
      }
    }
  }
}
</style>
