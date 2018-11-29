<template>
  <div v-editable="blok" class="download-item">
    <div class="title">{{blok.name}}</div>
    <div class="subtitle">
      {{filename}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  created() {
  },
  computed: {
    filename() {
      let tokens = this.blok.file.split('/');
      return tokens[tokens.length-1];
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.download-item {
  .title {
    text-transform: uppercase;
    color: $color-orange;
    font-weight: bold;
  }
  .subtitle {
  }
}
</style>
