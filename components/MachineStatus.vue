<template>
  <div class="machine-status" v-if="hasUser">
    <div class="resource" v-if="resource" :style="{ color }">
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
      <div v-else-if="resource.state == 'locked'">
        <div v-if="resource.offline">
          out of order & offline
        </div>
        <div v-else>
          out of order
        </div>
        <div v-if="resource.maintenanceNote">
          {{resource.maintenanceNote}}
        </div>
      </div>
      <div v-else>
        {{resource.state}}
      </div>
    </div>
    <div v-else>
      Prüfe...
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
  props: ['id'],
  created() {
    this.$store.dispatch('checkStatus', this.id).then((r) => {
      this.resource = r;
    });
  },
  computed: {
    hasUser() {
      return !!this.$store.state.user;
    },
    color() {
      if (!this.resource) {
        return '#000';
      }
      if (this.resource.state == 'locked') {
        return '#FFFF00';
      }
      if (this.resource.offline) {
        return '#FF0000';
      }
      if (this.resource.inUse) {
        return '#0000FF';
      }
      if (this.resource.state == 'active') {
        return '#00FF00';
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.machine-status {
  .resource {
    div {
      display: inline-block;
      text-transform: uppercase;
    }
  }
}
</style>
