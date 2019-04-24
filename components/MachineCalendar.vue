<template>
  <div class="machine-calendar">
    <div v-if="bookings">
      <kalendar :configuration="calendar_settings" :appointments="appointments"/>
      </kalendar>
    </div>
    <div v-else>
      loading
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      bookings: null,
      calendar_settings: {
        style: 'material_design',
        view_type: 'Day',
        split_value: 30,
        cell_height: 20,
        current_day: new Date(),
        read_only: true
      },
    }
  },
  props: ['id'],
  mounted() {
    this.$store.dispatch('getBookings', this.id).then((r) => {
      this.bookings = r;
      console.log(this.appointments);
    });
  },
  computed: {
    appointments() {
      return this.bookings.map((b) => {
        console.log(b);

        return {
          data: {
            title: 'Member Booking',
            description: b.state
          },
          from: b.fromDateTime,
          to: b.untilDateTime,
          date: moment(b.fromDateTime).format(''),
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.machine-status {
  padding: 10px;
  .resource {
    padding: 10px;
    font-weight: bold;
    color: #FFF;
    div {
      display: inline-block;
      text-transform: uppercase;
    }
  }
}
</style>
