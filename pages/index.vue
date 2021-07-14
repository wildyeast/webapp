<template>
  <section class="util__container">
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component">
    </component>
    <BlogBestOf />
  </section>
</template>
<script>
import BlogBestOf from '../components/BlogBestOf'
export default {
  component: {
    BlogBestOf
  },
  asyncData (context) {
    return context.store.dispatch('loadPage', '/')
  },
  data () {
    return { story: { content: {} } }
  }
}
</script>
