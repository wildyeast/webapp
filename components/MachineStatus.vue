<template>
  <div class="machine-status" :style="{ 'background-color': color, 'font-size': fontSize }">
    <div class="machine-name" v-if="name">
      {{name}}
    </div>
    <div class="resource" v-if="resource">
      <div v-if="resource.state == 'active'">
        <div v-if="resource.offline">
          offline
        </div>
        <div v-else-if="resource.inUse">
          in Verwendung
        </div>
        <div v-else>
          Verfügbar
        </div>
      </div>
      <div v-else-if="resource.state == 'locked'" :title="resource.maintenanceNotes">
        out of order
      </div>
      <div v-else>
        {{resource.state}}
      </div>
    </div>
    <div v-else>
      <loading-spinner color="#333"></loading-spinner>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resource: null
    }
  },
  props: ['id', 'name'],
  created() {
    this.$store.dispatch('checkStatus', this.id).then((r) => {
      this.resource = r;
    });
  },
  computed: {
    color() {
      if (!this.resource) {
        return '#FFF';
      }
      if (this.resource.state == 'locked') {
        return '#ebe223';
      }
      if (this.resource.offline) {
        return '#666';
      }
      if (this.resource.inUse) {
        return '#ff6f00';
      }
      if (this.resource.state == 'active') {
        return '#0069aa';
      }
    },
    fontSize () {
      return this.resource && this.resource.inUse ? '0.9em' : '1em'
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.machine-status {
  padding: 10px;
  border-bottom: 1px solid #f2f3ee;
  .machine-name {
    margin-bottom: 5px;
    font-weight: bold;
  }
  .resource {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 0.9em;
    color: #FFF;
    height: 2em;
    div {
      display: inline-block;
      text-transform: uppercase;
    }
  }
}
</style>
