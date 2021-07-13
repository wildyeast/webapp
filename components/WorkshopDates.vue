<template>
  <div class="workshop-dates">
    <div
      v-for="d in dates"
      :key="d.id"
      class="workshop-date"
      :class="{ soldOut: d.content.sold_out }"
    >
      <div class="info-row">
        <div class="info-block">
          <div class="col info">
            <icon name="calendar" />
            {{ formatDate(d.content.starttime) }}

          </div>
          <div class="col info">
            <icon name="clock" />
            <span>{{ formatTime(d.content.starttime) }}</span>
            <span v-if="d.content.endtime"> bis {{ formatTime(d.content.endtime) }}</span>
            <span>Uhr</span>
          </div>
        </div>
        <div class="info-block">
          <div
            v-if="d.content.members_only"
            class="col"
          >
            <icon name="user" />
            <span>Members only!</span>
          </div>
          <!--<div class="col soldOut" v-if="d.content.sold_out">
            <span>ausgebucht</span>
          </div>-->

          <div
            v-if="metadata != null && !(d.content.link && d.content.link.cached_url && d.content.link.cached_url != '')"
            class="col"
          >
            <span>Preis: {{ metadata[d.uuid].price }}EUR</span>
          </div>

          <div
            v-if="metadata == null && logged_in != false && hideRegister != true"
            class="col"
          >
            <loading-spinner color="black" />
          </div>
          <div
            v-if="metadata == null && logged_in == false && hideRegister != true"
            class="col"
          >
            Für die Buchung eines Workshops musst du registriert und eingeloggt sein. Danke!
          </div>
          <div class="spacer" />

          <div
            v-if="metadata != null &&metadata[d.uuid].occupancy >= 100 || d.content.sold_out"
            class="col soldOut"
          >
            <span>ausgebucht</span>
          </div>
          <div
            v-if="metadata != null &&metadata[d.uuid].occupancy < 100 && !(d.content.link && d.content.link.cached_url && d.content.link.cached_url != '')"
            class="col occupanc y"
          >
            <span>aktuelle Auslastung: {{ Math.round(metadata[d.uuid].occupancy) }}%</span>
          </div>
          <div class="spacer" />

          <!--<div class="col register" v-if="d.content.link && d.content.link.cached_url && d.content.link.cached_url != '' && !d.content.sold_out">
            <a :href="d.content.link.cached_url" class="link" target="_blank">Zur Anmeldung</a>
          </div>
          -->
          <div
            v-if="hideRegister != true && !(d.content.link && d.content.link.cached_url && d.content.link.cached_url != '')"
            class="col register"
          >
            <NuxtLink v-if="metadata"
              :event="metadata == null || metadata[d.uuid].occupancy >= 100|| metadata[d.uuid].already_booked == true ? '': 'click'"
              :to="{ path: '/me/buyWorkshop', query: { uuid: d.uuid }}"
              class="link"
            >
              {{ metadata != null && metadata[d.uuid].already_booked == true ? 'Du hast diesen Workshop schon gebucht.  ' : 'Zur Anmeldung' }}
            </NuxtLink>
            <span v-else class="link" @click="$store.dispatch('setSidebar', 'login')">
              Zur Anmeldung
            </span>
          </div>
          <div
            v-if="hideRegister != true && d.content.link && d.content.link.cached_url && d.content.link.cached_url != '' && !d.content.sold_out"
            class="col register"
          >
            <a
              :href="d.content.link.cached_url"
              class="link"
              target="_blank"
            >Zur Anmeldung</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  props: {
    dates: Array,
    date: Array,
    hideRegister: Boolean,
    noMetadata: Boolean
  },
  data () {
    return {
      metadata: null,
      logged_in: null
    }
  },
  computed: {
    content () {
      return this.date.content
    }
  },
  mounted () {
    if (this.noMetadata !== true) {
      this.loadMetaData()
    }
  },
  created () {

  },
  methods: {
    formatDate: function (value) {
      return moment(value).format('DD.MM.YYYY')
    },
    formatTime: function (value) {
      return moment(value).format('HH:MM')
    },
    loadMetaData: function () {
      const body = {
        workshop_date_uuids: []
      }

      for (const date of this.dates) {
        body.workshop_date_uuids.push(date.uuid)
      }
      this.$store.dispatch('checkAuth').then((isLoggedIn) => {
        if (isLoggedIn !== false) {
          this.$store.dispatch('getWorkshopDateMetadata', body).then((data) => {
            this.metadata = data
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.logged_in = false
        }
      })
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

  .disabled {
    background-color: lightgray !important;
    pointer-events: none;
  }
  .link {
    cursor: pointer;
    color: white;
  }
}
</style>
