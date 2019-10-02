<template>
  <div class="machine-calendar">
    <div v-if="bookings">
      <!--<kalendar :configuration="calendar_settings" :events="events"/></kalendar>-->
      <vue-cal class="calendar" xsmall
               default-view="day"
               :events="events"
              :disable-views="['years', 'year', 'month']"></vue-cal>
    </div>
    <div v-else>
      loading
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import VueCal from 'vue-cal'
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
          start: moment(b.fromDateTime).format('YYYY-MM-DD hh:mm'),
          end: moment(b.untilDateTime).format('YYYY-MM-DD hh:mm'),
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
