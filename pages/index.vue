<template>
  <section class="util__container">
    <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
    <BlogBestOf :msg="name" />
  </section>
</template>
<script>
import BlogBestOf from "../components/BlogBestOf"
export default {
  components: {
    BlogBestOf
  },
  data () {
    return { story: { content: {} }, name: "Laura" }
  },
  asyncData (context) {
    return context.store.dispatch("loadPage", "/");
  }
}
</script>
