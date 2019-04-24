<template>
  <div v-editable="machine" class="machine-page">
    <machine-header :story="story"></machine-header>
    <div class="body">

      <div class="headline">{{machine.headline}}</div>

      <div class="inner-body">
        <div class="description">
          <markdown :value="machine.description"></markdown>
        </div>

        <div class="machine-list" v-if="machine.fabmanId && hasUser">
          <div class="machine-item">
            <machine-status class="status" :id="machine.fabmanId"></machine-status>
            <machine-calendar :id="machine.fabmanId"></machine-calendar>
          </div>
        </div>
      </div>

      <!--
      <ul class="feature-list">
        <li class="feature-item" v-for="(i, index) in machine.features" v-bind:key="index">
          <div class="title">
            {{i.title}}
          </div>
          <div class="text">
            {{i.text}}
          </div>
        </li>
      </ul>
      -->

      <div class="images" v-if="machine.images && machine.images.length > 0" >
        <image-gallery :images="machine.images" name="test"></image-gallery>
      </div>
    </div>
  </div>
</template>

<script>
import MachineStatus from '@/components/MachineStatus';
import MachineCalendar from '@/components/MachineCalendar';
import MachineHeader from '@/components/MachineHeader';

export default {
  components: {
    MachineHeader,
    MachineStatus,
    MachineCalendar,
  },
  props: ['story'],
  computed: {
    machine() {
      return this.story.content;
    },
    tags() {
      return this.story.tag_list;
    },
    hasUser() {
      return !!this.$store.state.user;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.machine-page {
  .body {
    font-family: $font-mono;
    @include margin-page-middle();
    .headline {
      text-transform: uppercase;
      font-family: $font-primary;
      font-weight: 600;
      font-size: 1.8em;
      @include media-breakpoint-up(sm) {
        font-size: 2.8em;
      }
      letter-spacing: .03em;
      white-space: pre-wrap;
      line-height: 1.24;
      margin-bottom: 4vh;
    }
    .description {
      font-size: .9rem;
      line-height: 2.2;
      margin-bottom: 4vh;
    }
    .inner-body {
      display: flex;
      .description {
        flex: 8;
      }
      .machine-list {
        flex: 4;
      }
    }
    /*
    .feature-list {
      color: $color-blue;
      display: grid;
      @include media-breakpoint-up(sm) {
        grid-template-columns: 50% 50%;
      }
      margin: 0;
      padding: 1em;
      max-width: 80em;
      .feature-item {
        margin: 0;
        margin-bottom: 4vh;
        @include media-breakpoint-up(sm) {
          padding-right: 20%;
        }
        font-size: .9rem;
        line-height: 1.4;
        .title {
          font-weight: 700;
          text-transform: uppercase;
        }
        .text {

        }
      }
    }
      */
  }
}
</style>
