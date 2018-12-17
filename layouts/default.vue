<template>
  <div class="layout-container">
    <top-header/>
    <main id="main" role="main">
      <nuxt/>
    </main>
    <bottom-footer/>
    <sidebar />
    <breadcrumbs />
  </div>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'
import BottomFooter from '~/components/BottomFooter.vue'
import Sidebar from '~/components/Sidebar.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

export default {
  components: {
    TopHeader,
    BottomFooter,
    Sidebar,
    Breadcrumbs,
  },
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
.layout-container {
  margin-top: 65px;
  overflow: hidden;
}
</style>
