<template>
  <div v-editable="machine" class="machine-page">
    <machine-header :story="story"></machine-header>
    <div class="body">
      <text-image :blok="teaser"></text-image>

      <div class="description">
        <markdown :value="machine.description"></markdown>
      </div>

      <image-slideshow :blok="images"></image-slideshow>

      <h3 class="blue">Links</h3>
      <ul class="link-list">
        <li class="link-item" v-for="(i, index) in machine.links" v-bind:key="index">
          <div class="title">
            {{i.title}}
          </div>
          <a class="url" :href="i.url" target="_blank">{{i.url}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MachineHeader from '@/components/MachineHeader';

export default {
  components: {
    MachineHeader
  },
  props: ['story'],
  computed: {
    machine() {
      return this.story.content;
    },
    tags() {
      return this.story.tag_list;
    },
    images() {
      return {
        items: this.machine.images
      }
    },
    teaser() {
      return {
        text: this.machine.teaser,
        title: this.machine.title,
        image: this.machine.image
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.machine-page {
  h3 {
    &.blue {
      color: $color-blue;
    }
  }
  .body {
    font-family: $font-mono;
    @include margin-page-middle();
    .headline {
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
    .teaser {
      font-weight: bold;
    }
    .description {
      font-size: .9rem;
      line-height: 1.4;
      margin-bottom: 4vh;
      @include media-breakpoint-up(md) {
        width: 70%;
      }
    }
    .link-list {
      color: $color-blue;
      display: block;
      margin: 0;
      padding: 1em;
      padding-left: 0;
      max-width: 80em;
      .link-item {
        word-break: break-all;
        list-style-type: none;
        margin: 0;
        margin-bottom: 4vh;
        font-size: 1.1rem;
        line-height: 1.4;
        .title {
          font-weight: 700;
          text-transform: uppercase;
        }
        .url {
          color: $color-blue;
          font-size: 0.9rem;
          font-family: $font-mono;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
