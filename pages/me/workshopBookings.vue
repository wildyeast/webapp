<template>
  <div>
    <h2>Meine Workshops</h2>
    <div
      v-if="bookings.length"
      class="workshops"
    >
      <div
        v-for="workshopDate in bookings"
        :key="workshopDate.content.workshop.uuid"
        class="workshop-item"
      >
        <workshop-preview
          :id="workshopDate.content.workshop.uuid"
          :key="workshopDate.content.workshop.uuid"
          class="preview"
        />
        <workshop-dates
          :dates="[workshopDate]"
          class="workshop-dates"
          :hide-register="true"
          :no-metadata="true"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Invoices',
  middleware: 'authenticated',
  data () {
    return {
      bookings: []
    }
  },
  computed: {},
  mounted () {
    this.$store.dispatch('getBookedWorkshops').then(data => {
      data.forEach(uuid => {
        this.$store.dispatch('loadStoryByUUid', uuid).then(data => {
          this.bookings.push(data.story)
        })
      })
    })
  },
  methods: {}
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
