<template>
  <div class="page">
    <component :is="blok.component" v-for="blok in blok.body" :key="blok._uid" :blok="blok">  </component>
    <BlogBestOf />
  </div>
</template>

<script>
import BlogBestOf from './BlogBestOf'
export default {
  components: { BlogBestOf },
  props: ['blok']
}
</script>

<style lang="scss">
.page {
}
</style>
