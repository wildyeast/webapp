<template>
  <div v-editable="blok" class="member-page">
    <div class="header">
      <div class="image">
        <img :src="blok.image" alt=""/>
      </div>
      <div class="info">
        <div class="name">{{blok.name}}</div>
        <div class="title">{{blok.title}}</div>
        <div class="short-description">
          {{blok.short_description}}
        </div>
      </div>
    </div>
      <div>
        <markdown :value="blok.description"></markdown>
      </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.member-page {
  display: inline-block;
  padding: 25px;
  min-height: 150px;
  width: 100%;

  .header {
    display: flex;
    .image {
      flex: 1;
    }

    .info {
      flex: 1;
      .name {
        font-family: $font-secondary;
        font-size: 1.5rem;
      }

      .title {
        font-family: $font-mono;
      }
    }
  }
}
</style>
