<template>
  <div class="machine-header">
    <div class="header-image" :style="{ 'background-image': 'url(' + $resizeImage(machine.image, '1600x0') + ')' }">
    </div>
    <div class="header-title" v-if="machine.title">
      <code>{{tags}}</code>
      <div class="title">{{machine.title}}</div>
      <div class="subtitle">{{machine.subtitle}}</div>
    </div>
  </div>
</template>

<script>
export default {
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
.machine-header {
  height: calc(50vh - 89px);
  position: relative;
  .header-image {
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  .header-title {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #FFF;
    padding: 75px;
    min-width: 50%;
    .title {
      margin: 0;
      font-size: 3rem;
      font-family: 'Chakra Petch';
      font-weight: bold;
    }
    .subtitle {
    }
  }
}
</style>
