<template>
  <section class="util__container">
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </section>
</template>
<script>
export default {
  asyncData (context) {
    return context.store.dispatch('loadPage', '/')
  },
  data () {
    return { story: { content: {} } }
  }
}
</script>
