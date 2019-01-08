<template>
  <div v-editable="machine" class="machine-page">
    <machine-header :story="story"></machine-header>
    <div class="body">
      <div class="teaser">
        {{machine.teaser}}
      </div>
      <div class="description">
        <markdown :value="machine.description"></markdown>
      </div>
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
      <div class="images" v-if="machine.images && machine.images.length > 0" >
        <image-gallery :images="machine.images"></image-gallery>
      </div>
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
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.machine-page {
  .body {
    .teaser {
      font-weight: bold;
    }
    .description {
    }
  }
}
</style>
