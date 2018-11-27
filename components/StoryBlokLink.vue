<template>
  <nuxt-link v-if="link.linktype == 'story'" :to="'/' + link.cached_url" class="link"><slot/></nuxt-link>
  <a v-else-if="link.linktype == 'url'" :href="link.cached_url" class="link"><slot/></a>
</template>

<script>
export default {
  props: ['link'],
}
</script>

<style lang="scss"></style>
