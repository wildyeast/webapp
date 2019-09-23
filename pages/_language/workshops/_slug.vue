<template>
  <section class="util__container" v-if="workshop">
    <workshop-header :blok="workshop.content"></workshop-header>
    <workshop-info :blok="workshop.content"></workshop-info>
    <workshop-dates :dates="dates"></workshop-dates>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return {}
  },
  mixins: [storyblokLivePreview],
  asyncData (context) {
    return context.store.dispatch("loadWorkshopItem", context.params.slug);
  }
}
</script>


<style lang="scss" scoped></style>
