<template>
  <div v-editable="blok" class="corporate-content">
    <div>
      <div>{{blok.headline}}</div>
      <div>{{blok.subline}}</div>
    </div>
    <div class="text">
      {{blok.text}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.corporate-content {
}

</style>
