<template>
  <div class="workshop-dates-block">
    <div class="workshop-dates">
      <div class="workshop-date" v-for="d in dates" :class="{ soldOut: d.content.sold_out }">
        <div class="info-row">
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
          <div class="col" v-if="d.content.members_only">
            <icon name="user" />
            <span>Members only!</span>
          </div>
          <div class="col soldOut" v-if="d.content.sold_out">
            <span>ausgebucht</span>

          </div>
          <div class="spacer"></div>
          <div class="col soldOut" v-if="d.content.sold_out">
            <a v-if="d.content.link && d.content.link.cached_url && d.content.link.cached_url != '' " :href="d.content.link.cached_url" class="link" target="_blank">Zur Anmeldung</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dates'],
  data() {
    return {}
  },
  computed: {
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.workshop-dates-block {
  color: #000;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  @include margin-page-wide();
  @include media-breakpoint-up(md) {
    margin: 0 100px;
  }
  .workshop-dates {
    width: 100%;
    margin-top: 20px;
    margin-left: 25%;
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
        line-height: 1.6;
        font-family: $font-mono;
        font-size: 0.9rem;
        font-weight: bold;
        margin: -8px;
        display: flex;
        .col {
          padding: 8px;
          &.soldOut {
            color: $color-orange;
            text-transform: uppercase;
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
}
</style>
