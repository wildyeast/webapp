<template>
  <section class="">
    <div>
      Hello World
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {}
  },
  created() {
    if (process.client) {
      let hash = this.$route.hash;
      this.$store.dispatch('auth', { hash }).then((r) => {
        console.log(r);
      });
    }
  },
}
</script>
