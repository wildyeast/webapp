<template>
  <div class="workshop-dates">
    <div class="workshop-date" v-for="d in dates" :class="{ soldOut: d.content.sold_out }">
      <div class="info-row">
        <div class="info-block">
          <div class="col info">
            <icon name="calendar" />
            {{d.content.starttime | date}}
          </div>
          <div class="col info">
            <icon name="clock" />
            <span>{{d.content.starttime | time}}</span>
            <span v-if="d.content.endtime"> bis {{d.content.endtime | time}}</span>
            <span>Uhr</span>
          </div>
        </div>
        <div class="info-block">
          <div class="col" v-if="d.content.members_only">
            <icon name="user" />
            <span>Members only!</span>
          </div>
          <!--<div class="col soldOut" v-if="d.content.sold_out">
            <span>ausgebucht</span>
          </div>-->
          <div class="col soldOut" v-if="sold">
            <span>ausgebucht</span>
          </div>
          <div class="col occupancy" v-if="!sold">
            <span>Gebucht: {{ occupancy }}%</span>
          </div>
          <div class="spacer"></div>
          <!--<div class="col register" v-if="d.content.link && d.content.link.cached_url && d.content.link.cached_url != '' && !d.content.sold_out">
            <a :href="d.content.link.cached_url" class="link" target="_blank">Zur Anmeldung</a>
          </div>
          -->
          <div class="col register" v-if="!sold"><NuxtLink :to="{ path: '/me/buyWorkshop', query: { date: d }}" class="link">Zur Anmeldung</NuxtLink></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    dates : Array,
    date : Array
  },
  data() {
    return {
      occupancy: 0,
      sold: false,
    }
  },
  computed: {
    content() {
      return this.date.content;
    }
  },
  mounted() {
        console.log(this.dates);
  },
  created() {
    this.metaData();
  },
  methods: {
    metaData: function () {
      let data = {
        "workshop_date_uuids": [],
      }
      console.log(this.dates);
      // data.workshop_date_uuids.push("f703768e-fc67-4b60-bc06-c66e21e68aea")
      for(let i = 0; i <= this.dates.length; i++){
        if(this.dates[i] !== undefined && i %2 !== 0){
          // console.log(i);
          // console.log(this.dates[i].uuid);
          data.workshop_date_uuids.push(this.dates[i].uuid);
        }
      }

      console.log(data);

      this.$store.dispatch("getWorkshopDateMetadata", data).then((data) => {
          console.log(data);

        for(let j = 0; j <= this.dates.length; j++){
          if(this.dates[j] !== undefined && j %2 !== 0){

            console.log(data[this.dates[j].uuid].occupancy);
            this.occupancy = data[this.dates[j].uuid].occupancy;
            if(this.occupancy < 100) {
              console.log("Course is not fully booked yet!");
            }
            if(this.occupancy == 100) {
              console.log("Course is booked!");
              this.sold = true;

            }
          }
        }

        }).catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.workshop-dates {
  width: 100%;
  margin-top: 20px;
  .workshop-date {
    margin-top: 4px;
    padding: 10px;
    background-color: #FFF;
    &.soldOut {
      color: #666;
      fill: #666;
      .col {
        &.info {
          text-decoration: line-through;
        }
      }
    }
    .info-row {
      @include media-breakpoint-down(md) {
        flex-direction: column;
      }
      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;
      margin: -8px;
      display: flex;
      .info-block {
        flex: 1;
        flex-direction: row;
        display: flex;
      }
      .col {
        padding: 8px;
        &.soldOut {
          color: $color-orange;
          text-transform: uppercase;
        }
        &.register {
          background-color: $color-orange;
          a {
            color: #FFF;
          }
        }
      }
      .spacer {
        flex: 1;
      }
      svg {
        height: 1em;
        width: 1em;
      }
    }
  }
}
</style>
