<template>
  <section class="machine-status-overview">
    <div class="machine-list-wrapper">
      <div v-if="machines && machines.length > 0" class="machine-list">
        <transition-group name="list">
          <machine-status-list-item v-for="item in machines" :blok="item" :key="item.id" class="list-item"></machine-status-list-item>
        </transition-group>
      </div>
      <div v-else class="machine-list-none">
        <code>Keine Suchergebnisse</code>
      </div>
    </div>
  </section>
</template>

<script>
import Checkbox from "~/components/Checkbox.vue";

export default {
  layout: 'screen',
  components: {
    Checkbox,
  },
  data () {
    return {
      loading: false,
      search: '',
      tagsCollapsed: true,
    }
  },
  created() {
    this.$watch('tags', (newVal, oldVal) => {
      this.update();
    }, { deep: true });
  },
  watch: {
    search() {
      this.update();
    }
  },
  methods: {
    update() {
      this.loading = true;
      let result = this.$store.dispatch("findMachines", this.filters).then((data) => {
        this.loading = false;
        this.machines = data.stories;
      });
    },
    toggleTags() {
      this.tagsCollapsed = !this.tagsCollapsed;
    }
  },
  computed: {
  },
  async asyncData (context) {
    let tags = await context.store.dispatch("loadTags");
    let filters = {
      filter_query: {
        'component': {
          'in': 'machine'
        }
      }
    };
    let machines = await context.store.dispatch("findStatusMachines", filters).then((data) => {
      if (data.stories) {
        return { machines: data.stories };
      }
      return { machines: [] };
    });
    return {tags, ...machines};
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.machine-status-overview {
  .loading {
    position: absolute;
  }
  .machine-list-wrapper {
    display: flex;
    @include margin-page-wide();
    .machine-list {
      > span {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      }
      flex: 3;
      .list-item {
        min-width: 150px;
        padding: 0 30px;
      }
      .list-enter-active, .list-leave-active {
        transition: all 0.5s;
      }
      .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(30px);
      }
    }
    .machine-list-none {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
