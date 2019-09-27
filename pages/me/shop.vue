<template>
  <component v-if="story && story.content && story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  middleware: 'authenticated',
  mixins: [storyblokLivePreview],
  data () {
    return {}
  },
  created() {
  },
  methods: {
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  asyncData (context) {
    let path = '/members/shop';
    return context.store.dispatch('loadPage', path).catch((e) => {
      context.error({ statusCode: e.response.status, message: e.response.statusText })
    });
  }
}
</script>

<style lang="scss">
</style>
