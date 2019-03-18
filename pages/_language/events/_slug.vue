<template>
  <section class="util__container">
    <workshop-header :blok="event"></workshop-header>
    <div v-editable="story.content" class="event">
      <workshop-info :blok="event"></workshop-info>
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
  computed: {
    event() {
      return this.story.content;
    }
  },
  asyncData (context) {
    return context.store.dispatch("loadEventItem", context.params.slug);
  }
}
</script>

<style lang="scss" scoped>
.event {
  .info {
    display: flex;
    justify-content: center;
    padding: 20px 100px;
    .markdown {
    }
  }
}
</style>
