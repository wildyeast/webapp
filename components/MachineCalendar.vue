<template>
  <div class="machine-calendar">
    <div v-if="bookings">
      <vue-cal class="calendar" xsmall
               default-view="day"
               :events="events"
               locale="de"
               :time-from="9 * 60" :time-to="20 * 60" :time-step="30"
               :disable-views="['years', 'year', 'month']"></vue-cal>
    </div>
    <div v-else>
      loading
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/de.js'
import 'vue-cal/dist/vuecal.css'

export default {
  props: ['id'],
  components: { VueCal },
  data() {
    return {
      bookings: null,
    }
  },
  created() {
    this.$store.dispatch('getBookings', this.id).then((r) => {
      this.bookings = r;
    });
  },
  computed: {
    events() {
      return this.bookings.map((b) => {
        return {
          title: 'Reserviert',
          content: b.state,
          start: moment(b.fromDateTime).format('YYYY-MM-DD HH:mm'),
          end: moment(b.untilDateTime).format('YYYY-MM-DD HH:mm'),
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.machine-calendar {
  .calendar {
    background-color: #FFF;
  }
}
</style>
