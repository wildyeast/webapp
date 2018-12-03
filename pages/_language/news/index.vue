<template>
  <section class="">
    <div class="news-feed">
      <news-feed-item v-for="item in stories" :news="item.content" :key="item.id"></news-feed-item>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {}
  },
  asyncData (context) {
    let filters = {};
    return context.store.dispatch("findNews", filters);
  },
}
</script>

<style lang="scss">
.news-feed {
}
</style>
