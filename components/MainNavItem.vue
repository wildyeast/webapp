<template>
  <div class="nav-item">
    <sb-link :link="item.link" class="main-nav-item">
      {{ item.name }}
    </sb-link>
    <div class="dropdown" v-if="item.children && item.children.length > 0">
      <div v-for="child in item.children" :key="child.id" class="child">
        <sb-link :link="child.link" class="child-nav-item">
          {{ child.name }}
        </sb-link>
      </div>
    </div>
  </div>
</template>

<script charset="utf-8">
export default {
  props: ['item'],
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.nav-item {
  position: relative;
  .main-nav-item {
    display: block;
    text-transform: uppercase;
    color: #000;
    padding: 25px;
    text-decoration: none;
    font-weight: bold;
    font-size: 0.9rem;
    white-space: nowrap;
    &.nuxt-link-active {
      position: relative;
      &:before {
        color: $color-orange;
        position: absolute;
        font-size: 2.2rem;
        content: '•';
        left: 5px;
        top: 14px;
      }
    }
  }

  &.mobile {
    .dropdown {
      display: block;
      position: relative;
    }
  }
  .dropdown {
    display: none;
    position: absolute;
    padding: 20px;
    margin-left: -28px;
    background-color: #FFF;
    min-width: 150px;
    left: 25px;
    .child {
      .child-nav-item {
        white-space: nowrap;
        display: block;
        text-transform: uppercase;
        color: #000;
        text-decoration: none;
        font-weight: bold;
        font-size: 0.9rem;
        padding: 8px;
      }
    }
  }
  &:hover {
    .dropdown {
      display: block;
    }
  }
}
</style>
