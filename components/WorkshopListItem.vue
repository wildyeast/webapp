<template>
  <nuxt-link :to="'/' + blok.full_slug">
    <div class="workshop-list-item">
      <div class="image">
        <img :src="$resizeImage(content.image, '380x280')" alt=""/>
      </div>
      <div class="body">
        <div class="category">
          <div v-if="content.category == 'training'">
            <span>Einschulung</span>
          </div>
          <div v-if="content.category == 'event'">
            <span>Event</span>
          </div>
          <div v-if="content.category == 'meetup'">
            <span>Meetup</span>
          </div>
          <div v-if="content.category == 'workshop'">
            <span>Workshop</span>
          </div>
        </div>
        <div class="title">
          {{content.title}}
        </div>
        <div class="teaser">
          {{content.teaser}}
        </div>
        <div class="trainer">
          {{content.trainer}}
        </div>
        <div class="linktext">
          <div class="link-arrow"></div>
          <div>{{linktext}}</div>
        </div>
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
        <div class="icon">
          <icon :name="content.category" />
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    dates() {
      return this.blok.dates;
    },
    content() {
      return this.blok.content;
    },
    linktext() {
      return "Mehr Infos";
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.workshop-list-item {
  color: #000;
  display: flex;
  @include media-breakpoint-down(sm) {
    flex-direction: column;
  }
  margin-bottom: 25px;
  .image {
    @include media-breakpoint-down(sm) {
      overflow: hidden;
      margin: 0 -4%;
    }
    img {
      @include media-breakpoint-down(sm) {
        margin: -5vh 0;
      }
      max-height: calc(40vh - 65px);
      max-width: 100%;
      display: block;
    }
  }
  .body {
    position: relative;
    flex: 2;
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    padding: 1.8rem;
    @include media-breakpoint-down(sm) {
      margin-left: 2%;
    }
    .icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 120px;
      padding: 10px;
      svg {
        fill: #EEE;
      }
    }
    .title {
      position: relative;
      z-index: 1;
      font-family: $font-secondary;
      font-size: 2rem;
      margin-bottom: .4rem;
    }
    .category {
      position: relative;
      z-index: 1;
      font-family: $font-mono;
      font-size: 0.9rem;
      letter-spacing: .1em;
      margin-bottom: .3rem;
      text-transform: uppercase;
      color: $color-orange;
      svg {
        fill: $color-orange;
        height: 1em;
        width: 1em;
      }
    }
    .teaser {
      position: relative;
      z-index: 1;
      flex: 1;
      font-family: $font-mono;
      line-height: 1.6;
      font-size: 0.9rem;
      width: 85%;
      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }
    .trainer {
      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;
      margin: .4em 0;
    }
    .linktext {
      text-transform: uppercase;
      color: $color-blue;
      margin: 1em 0 .5em;
      display: flex;
      align-items: center;
      .link-arrow {
        border-top: $color-blue 1px solid;
        width: 1em;
        position: relative;
        margin-right: .3em;
        &:before {
          position: absolute;
          right: 0;
          content: "";
          border-top: $color-blue 1px solid;
          border-right: $color-blue 1px solid;
          transform: rotateZ(45deg);
          transform-origin: top right;
          height: .3em;
          width: .3em;
          margin-top: -.5px;
        }
      }
    }
  }
}
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
</style>
