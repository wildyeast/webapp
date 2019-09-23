<template>
  <div v-editable="blok" class="workshop-info">
    <div class="teaser-content">
      <h2 v-if="blok.subtitle" class="headline">
        {{blok.subtitle}}
      </h2>
      <div v-if="blok.teaser && !blok.info" class="teaser">
        {{blok.teaser}}
      </div>
      <code>{{dates}}</code>
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
          </div>
        </div>
      </div>
      <markdown v-if="blok.info" :value="blok.info" class="info"></markdown>
      <a v-if="blok.link && blok.link.cached_url && blok.link.cached_url != '' " :href="blok.link.cached_url" class="link" target="_blank">{{linktitle}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  data() {
    return {
      dates: []
    }
  },
  computed: {
    linktitle() {
     return  this.blok.linktitle;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.workshop-info {
  color: #000;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  .workshop-dates {
    margin-top: 20px;
    .workshop-date {
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
        svg {
          height: 1em;
          width: 1em;
        }
      }
    }
  }
  .teaser-content {
    @include margin-page-wide();
    @include media-breakpoint-up(md) {
      margin: 0 100px;
    }
    flex-direction: column;
    position: relative;
    display: flex;
    align-items: flex-start;
    .headline {
      position: relative;
      @include media-breakpoint-up(md) {
        max-width: 50%;
        font-size: 2.8rem;
      }
      @include media-breakpoint-down(sm) {
        margin: 3vh 5%;
      }
      line-height: 1.5;
      font-family: $font-secondary;
    }
    .teaser, .info {
      max-width: 90%;
      @include media-breakpoint-up(md) {
        margin-left: 25%;
      }
      font-weight: normal;
      font-family: $font-primary;
      line-height: 1.8;
      font-size: 1.1rem;
      @include media-breakpoint-down(sm) {
        line-height: 1.4;
        font-size: 1rem;
        margin: 0 0 0 5%
      }

    }
    .link {
      background-color: $color-orange;
      margin: 2% 0 0 5%;
      text-transform: uppercase;
      @include media-breakpoint-up(md) {
        margin-left: 25%;
      }
      color: #fff;
      padding: .7em .8em;
      font-weight: 800;
    }
  }
}
</style>
