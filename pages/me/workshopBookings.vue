<template>
  <div>
    <h2>Meine Workshops</h2>
    <div class="workshops" >
      <div class="workshop-item" v-for="workshopDate in bookings">
        <workshop-preview class="preview" :key="workshopDate.content.workshop.uuid"
                          :id="workshopDate.content.workshop.uuid"></workshop-preview>
        <workshop-dates :dates="[workshopDate]" class="workshop-dates" :hideRegister="true" :noMetadata="true"></workshop-dates>

      </div>

      <div>

      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "invoices",
  middleware: 'authenticated',
  data() {
    return {
      bookings: []
    }
  },
  mounted() {
    this.$store.dispatch("getBookedWorkshops").then(data => {
      console.log(data);
      data.forEach(uuid => {
        this.$store.dispatch("loadStoryByUUid", uuid).then(data => {
          this.bookings.push(data.story);
        });
      })


    });

  },
  methods: {},
  computed: {},
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.workshops{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.workshop-item{
  max-width: 50%;
}
</style>
