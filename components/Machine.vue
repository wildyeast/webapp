<template>
  <div v-editable="machine" class="machine-page" v-if="machine">
    <machine-header :story="story"></machine-header>
    <div class="machine-teaser">
      <!--
        <h3 class="title">
        {{blok.title}}
        </h3>
      -->
      <div class="body">
        <div class="image">
          <img :src="$resizeImage(machine.image, '700x0')" alt=""/>
        </div>
        <div class="text">
          <markdown :value="machine.teaser"></markdown>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="description">
        <markdown :value="machine.description"></markdown>
      </div>
    </div>
    <div class="body">
      <image-slideshow :blok="images"></image-slideshow>
    </div>
    <div class="body">
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
  .machine-teaser {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      text-transform: uppercase;
    }
    .body {
      display: flex;
      @include media-breakpoint-down(md) {
        flex-direction: column;
      }
      .text {
        flex: 2;
        display: flex;
        padding: 0 3em;
        line-height: 1.5;
        font-size: 1.1rem;
        @include media-breakpoint-down(sm) {
          font-size: 1rem;
          line-height: 1.4;
        }
      }
      .image {
        padding: 0 3em;
        flex: 1;
        @include media-breakpoint-down(md) {
          margin-top: 1em;
          padding-left: 0;
        }
        padding-right: 0;
        img {
          margin: auto;
          display: block;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
  .body {
    font-family: $font-mono;
    margin: 0 4%;
    margin-bottom: 1em;
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
