<template>
  <div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  created() {
  },
  methods: {
    next() {
      this.$router.push('/me');
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';
</style>
