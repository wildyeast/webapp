<template>
  <div v-editable="blok" class="machine-page">
    <machine-header :blok="blok"></machine-header>
    <div class="body">
      <div class="teaser">
        {{blok.teaser}}
      </div>
      <div class="description">
        <markdown :value="blok.description"></markdown>
      </div>
      <ul class="feature-list">
        <li class="feature-item" v-for="i in blok.features">
          <div class="title">
            {{i.title}}
          </div>
          <div class="text">
            {{i.text}}
          </div>
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
  props: ['blok'],
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
