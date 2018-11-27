<template>
  <div v-html="renderedMarkdown"></div>
</template>

<script>
import marked from 'marked';

export default {
  props: ['value'],
  computed: {
    renderedMarkdown() {
      return marked(this.value);
    }
  }
}
</script>

<style lang="scss">
</style>
