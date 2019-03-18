<template>
  <section class="event-overview">
    <div class="event-filters">
      <div class="search">
        <input type="text" placeholder="Events suchen" v-model="search">
      </div>
      <loading class="loading" v-if="loading"></loading>
    </div>
    <!--
    <div class="event-orders">
      <div class="headline">
        Sortieren nach:
      </div>
      <div class="order-list">
        <div class="order-item" v-for="o in orders">
        </div>
      </div>
    </div>
    -->
    <div class="event-list-wrapper">
      <div v-if="events && events.length > 0" class="event-list">
        <transition-group name="list">
          <event-list-item
            v-for="item in events"
            :blok="item"
            :key="item.id"
            class="list-item"
          ></event-list-item>
        </transition-group>
      </div>
      <div v-else class="event-list-none">
        <code>Keine Suchergebnisse</code>
      </div>
      <!--
      <div class="calendar">
        <date-pick v-model="date" :hasInputElement="false"></date-pick>
      </div>
      -->
    </div>
  </section>
</template>

<script>
import Checkbox from "~/components/Checkbox.vue";

export default {
  components: {
    Checkbox,
  },
  data () {
    return {
      loading: false,
      search: '',
    }
  },
  created() {
    this.update();
  },
  watch: {
    search() {
      this.update();
    }
  },
  methods: {
    update() {
      this.loading = true;
      let result = this.$store
        .dispatch("findEvents", this.filters)
        .then(data => {
          this.loading = false;
          this.events = data.stories;
        });
    }
  },
  computed: {
    filters() {
      return {
        filter_query: {
          component: {
            in: "event"
          }
        },
        search_term: this.search,
      }
    }
  },
  async asyncData (context) {
    let filters = {
      filter_query: {
        component: {
          in: "event"
        }
      }
    };
    let events = await context.store.dispatch("findEvents", filters).then((data) => {
      if (data.stories) {
        return { events: data.stories };
      }
      return { events: [] };
    });
    return {...events};
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.event-overview {
  .loading {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -40px);
  }

  .event-filters {
    .search {
      display: flex;
      margin: 0 4%;
      padding-top: 1rem;
      padding-bottom: 4rem;
      input[type="text"] {
        flex: 1;
        display: block;
        width: 100%;
        padding: 10px;
        outline: none;
        font-family: $font-secondary;
        font-size: 1.1rem;
        border: none;
      }
      input[type="button"] {
        font-size: 1.1rem;
        margin-left: 10px;
        text-transform: uppercase;
        background-color: transparent;
        border: none;
        font-weight: bold;
        color: $color-orange;
        outline: none;
      }
    }
  }
  .event-list-wrapper {
    margin: 0 4%;
    display: flex;
    .event-list {
      flex: 3;
      .list-item {
        margin-right: 10px;
      }
      .list-enter-active,
      .list-leave-active {
        transition: all 0.5s;
      }
      .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(30px);
      }
    }
    .event-list-none {
      flex: 3;
      text-align: center;
    }
    .calendar {
      flex: 1;
      max-width: 320px;
    }
  }
}
</style>
