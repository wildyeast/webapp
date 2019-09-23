<template>
  <section class="util__container" v-if="workshop">
    <workshop-header :blok="workshop"></workshop-header>
    <div v-editable="story.content" class="workshop">
      <workshop-info :blok="workshop"></workshop-info>
    </div>
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
    let d = context.store.dispatch("loadWorkshopItem", context.params.slug);
    console.log(d);
    return d;
  }
}
</script>


<style lang="scss" scoped>
.workshop {
  .info {
    display: flex;
    justify-content: center;
    padding: 20px 100px;
    .markdown {
    }
  }
}
</style>
