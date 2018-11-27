<template>
  <div v-editable="member" class="member-item">
    <div class="name">{{member.name}}</div>
    <div class="title">{{member.title}}</div>
  </div>
</template>

<script>
export default {
  props: ['member']
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.member-item {
  display: inline-block;
  padding: 25px;
  min-height: 150px;
  cursor: pointer;

  .name {
    font-family: $font-secondary;
    font-size: 1.5rem;
  }

  .title {
    font-family: $font-mono;
  }

  &:hover {
    background-color: $color-yellow;
  }
}
</style>
