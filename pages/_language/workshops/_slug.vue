<template>
  <section class="util__container" v-if="workshop">
    <workshop-header :blok="workshop.content"></workshop-header>
    <workshop-info :blok="workshop.content" :dates="dates"></workshop-info>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return {
      uid: null,
    }
  },
  methods: {
    bookWorkshop(){
      let data = {
       uuid: workshop_date_id,npm
      }
      this.$store.dispatch("bookWorkshop", data).then((result) => {
      })
      // this.$store.dispatch("updateUser", bookedWorkshop) => {

    }
  },
  mixins: [storyblokLivePreview],
  asyncData (context) {
    return context.store.dispatch("loadWorkshopItem", context.params.slug);
  },
  computed: {
    memberWorkshops() {
      return this.$store.getters.getMemberWorkshopById(Number(this.uid));
    }
  }
}
</script>


<style lang="scss" scoped></style>
