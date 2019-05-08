<template>
  <section class="workshop-overview">
    <div class="workshop-filters">
      <div class="filters">
        <div class="tags">
          <div class="headline">Themen</div>
          <div class="tag-list">
            <div v-for="t in tags" :key="t.key" class="tag">
              <checkbox
                v-model="t.value"
                class="tag"
                theme="white"
                >{{t.name}}</checkbox>
            </div>
          </div>
          <div class="headline">Themen</div>
          <div class="tag-list">
            <div v-for="t in tags" :key="t.key" class="tag">
              <checkbox
                v-model="t.value"
                class="tag"
                theme="white"
                >{{t.name}}</checkbox>
            </div>
          </div>
        </div>
        <div class="calendar">
          <date-pick v-model="date" :hasInputElement="false"></date-pick>
          <div class="reset">
            <div v-if="date != ''" class="all" @click="resetDate()">
              <span>Alle anzeigen</span>
            </div>
          </div>
        </div>
      </div>
      <div class="search">
        <input type="text" placeholder="Kurse und Workshops suchen" v-model="search">
      </div>
      <loading class="loading" v-if="loading"></loading>
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
    </div>
  </section>
</template>

<script>
import Checkbox from "~/components/Checkbox.vue";
import moment from "moment";

export default {
  components: {
    Checkbox,
  },
  data () {
    return {
      date: '',
      loading: false,
      search: '',
      workshops: [],
      tags: []
    }
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
    resetDate() {
      this.date = '';
    },
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
        search_term: this.search,
        with_tag: this.filterTags.join(',')
      }
    },
    filterTags() {
      return this.tags.filter((t) => {
        return t.value;
      }).map((t) => {
        return t.name;
      });
    }
  },
  async asyncData (context) {
    let tags = await context.store.dispatch("loadTags");
    let filters = {
      filter_query: {
        component: {
          in: "workshop"
        }
      }
    };
    let workshops = await context.store.dispatch("findWorkshops", filters).then((data) => {
      if (data.stories) {
        return { workshops: data.stories };
      }
      return { workshops: [] };
    });
    return {tags, ...workshops};
  },
}
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
    .filters {
      background-color: $color-orange;
      display: flex;
      .tags {
        flex: 3;
      }
      .calendar {
        flex: 1;
        max-width: 320px;
        .reset {
          margin-top: -3px;
          background-color: #000;
          padding: 10px;
          .all {
            padding: 10px;
            color: #FFF;
            &:hover {
              cursor: pointer;
              color: 000;
              background-color: $color-yellow;
            }
          }
        }
      }
    }
    .tags {
      @include media-breakpoint-down(sm) {
        padding: 4vh 0;
      }
      .headline {
        padding: 4vh 0 0 0;
        color: #FFF;
        font-weight: bold;
        font-size: 1.8rem;
        @include margin-page-wide();
        margin-bottom: 20px;
        text-transform: uppercase;
        letter-spacing: .05em;
        @include media-breakpoint-down(sm) {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
      }
      .tag-list {
        padding: 0 0 4vh 0;
        @include margin-page-wide();
        display: grid;
        max-width: 70em;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        @include media-breakpoint-down(lg) {
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
        @include media-breakpoint-down(md) {
          grid-template-columns: 1fr 1fr 1fr;
        }
        @include media-breakpoint-down(sm) {
          grid-template-columns: 1fr 1fr;
          font-size: .85em;
        }
        @include media-breakpoint-down(xs) {
          grid-template-columns: 1fr;
        }
        grid-gap: 15px 20px;
        >.tag {
          font-family: $font-mono;
          color: #FFF;
          user-select: none;
          cursor: pointer;
          input[type=checkbox] {
            outline: none;
            -webkit-appearance: none;
            padding: 5px;
            border: 1px solid #FFF;
            border-radius: 3px;
            position: relative;
            top: 0;
            &:checked {
              background-color: #FFF;
            }
          }
        }
      }
      @include media-breakpoint-down(sm) {
        overflow: hidden;
        position: relative;
        max-height: 1000px;
        transition: all .3s linear;
        padding-bottom: 30px;
        .expander {
          cursor: pointer;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 20px;
          transition: all .3s linear;
          &:after {
            transition: all .3s linear;
            content: "";
            position: absolute;
            bottom: 18px;
            left: 50%;
            width: 10px;
            height: 10px;
            bottom: 8px;
            border-bottom: 2px solid #fff;
            border-right: 2px solid #fff;
            margin-left: -13px;
            transform: rotate(225deg);
            transform-origin: center center;
          }
        }
        &.collapsed {
          max-height: 17vh;
          .expander {
            height: 70px;
            background: linear-gradient(rgba(0,0,0,0), $color-orange 80%);
            &:after {
              transform: rotate(45deg);
              bottom: 18px;
            }
          }
        }
      }
    }

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
  .workshop-list-wrapper {
    margin: 0 4%;
    display: flex;
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
  }
}
</style>
