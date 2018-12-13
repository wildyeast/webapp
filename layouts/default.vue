<template>
  <div class="layout-container">
    <top-header/>
    <main id="main" role="main">
      <nuxt/>
    </main>
    <bottom-footer/>
    <sidebar />
  </div>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'
import BottomFooter from '~/components/BottomFooter.vue'
import Sidebar from '~/components/Sidebar.vue'

export default {
  components: {
    TopHeader,
    BottomFooter,
    Sidebar
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
