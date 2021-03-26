<template>
  <div>
    <h2>Meine Aktivitäten</h2>
    <loading-spinner v-if="!activities" color="#333"></loading-spinner>
    <div class="activities" v-if="activities">
      <div class="activity" v-for="activity of activities" :key="activity.id">
        <div class="date">{{ new Date(activity.service_date).toLocaleDateString('de-AT') }}</div>
        <div class="right">
          <div class="top">
            <div class="name">{{ activity.product.external_name }}</div>
            <div class="count">{{ activity.product_count }}x</div>
            <div class="cost">{{ Math.round(activity.cost_brutto) }}EUR</div>
          </div>
          <div class="notes" v-if="activity.notes">{{ activity.notes }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "activities",
  middleware: 'authenticated',
  data() {
    return {
      activities: null,
      highlightedId: null
    }
  },
  async mounted () {
    this.activities = await this.$store.dispatch('getActivities')
    this.activities = this.activities.reverse()
    console.log(this.activities[0])
  },
  methods: {
    getDate (date) {
      return new Date(date)
    },
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.activities {
  & .activity {
    display: flex;
    flex-flow: row nowrap;
    padding: 0.4em;
    & .top {
      display: flex;
      flex-flow: row nowrap;
      & * {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    @include media-breakpoint-down(sm) {
      flex-direction: column;
      position: relative;
      background-color: #fafafa;
      margin: 1em 0;
      border: 1px solid grey;
      border-radius: 0.3em;
      & .icon {
        position: absolute;
        top: 1em;
        right: 0;
        font-size: 1.3em;
        margin-right: -1em;
      }
      & .name {
        font-size: 1.1em;
        padding-bottom: 0.4em;
        padding-top: 0.8em;
        width: 100%;
      }
      & .activityNumber {
        padding-bottom: 0.4em;
      }
    }
    & * {
      margin-right: 2em;
    }
    & .date {
      color: grey;
      width: 5em;
      transition: highlight 3s;
    }
    & .name {
      width: 20em;
    }
    & .activityNumber {
      width: 8em;
      color: grey;
    }
    & .green {
      color: green;
    }
    & .yellow {
      color: $color-orange;
    }
    & .count {
      min-width: 5em;
    }
    & .info {
      padding-left: 1em;
      // text-align: right;
      color: grey;
    }
    & .icon {
      display: flex;
      align-items: center;
      color: grey;
    }
    & .notes {
      color: grey;
      margin-top: 0.4em;
    }
  }
}
.activity:nth-child(odd) {
  background: #fafafa;
}
.activity:hover .icon {
  color: $color-blue-alt;
}
.pointer {
  cursor: pointer;
}
.highlighted {
  background: $color-yellow !important;
}
</style>