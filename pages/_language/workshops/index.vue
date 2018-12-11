<template>
  <section class="workshop-overview">
    <div class="workshop-filters">
      <div class="tags">
        <div class="headline">Bereiche</div>
        <div class="tag-list">
          <div v-for="t in tags" :key="t.key" class="tag">
            <checkbox
              :name="t.key"
              :id="t.key"
              :text="t.name"
              :onchange="checkboxVal => t.checked = checkboxVal"
            />
          </div>
        </div>
      </div>
      <div class="search">
        <input type="text" placeholder="Kurse und Workshops suchen" v-model="search" name id>
        <input type="button" value="Suchen" name id>
      </div>
      <loading class="loading" v-if="loading">loading…</loading>
    </div>
    <!--
    <div class="workshop-orders">
      <div class="headline">
        Sortieren nach:
      </div>
      <div class="order-list">
        <div class="order-item" v-for="o in orders">
        </div>
      </div>
    </div>
    -->
    <div class="workshop-list-wrapper">
      <div v-if="workshops && workshops.length > 0" class="workshop-list">
        <transition-group name="list">
          <workshop-list-item
            v-for="item in workshops"
            :blok="item"
            :key="item.id"
            class="list-item"
          ></workshop-list-item>
        </transition-group>
      </div>
      <div v-else class="workshop-list-none">
        <code>Keine Suchergebnisse</code>
      </div>
      <div class="calendar">
        <date-pick v-model="date" :hasInputElement="false"></date-pick>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      date: "2019-01-01",
      search: "",
      tags: [
        { name: "3D-Druck", key: "3d-print", checked: false },
        { name: "CAD/CAM", key: "cad-cam", checked: false },
        { name: "Lasercutter", key: "lazzor", checked: false }
      ]
    };
  },
  created() {
    this.$watch(
      "tags",
      (newVal, oldVal) => {
        this.update();
      },
      { deep: true }
    );
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
        .dispatch("findWorkshops", this.filters)
        .then(data => {
          this.loading = false;
          this.workshops = data.stories;
        });
    }
  },
  computed: {
    filters() {
      return {
        filter_query: {
          component: {
            in: "workshop"
          }
        },
        search_term: this.search
      };
    }
  },
  asyncData(context) {
    let filters = {
      filter_query: {
        component: {
          in: "workshop"
        }
      }
    };
    return context.store.dispatch("findWorkshops", filters).then(data => {
      if (data.stories) {
        return { workshops: data.stories };
      }
      return { workshops: [] };
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.workshop-overview {
  .loading {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -40px);
  }

  .workshop-filters {
    .tags {
      .headline {
        color: #fff;
        font-weight: bold;
        font-size: 1.8rem;
        margin-bottom: 20px;
      }
      .tag-list {
        margin: 0 -20px;
        .tag {
          display: inline-block;
          padding: 0 20px;
          font-family: $font-mono;
          color: #fff;
          user-select: none;
        }
      }
      padding: 40px;
      background-color: $color-orange;
    }

    .search {
      display: flex;
      padding: 10px;
      padding-bottom: 5rem;
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
  .workshop-list-wrapper {
    display: flex;
    padding: 20px;
    .workshop-list {
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
    .workshop-list-none {
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
