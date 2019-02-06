<template>
  <section>
    <div class="source-list">
      <checkbox
        theme="news"
        v-model="source.selected"
        v-for="source in sources"
        :key="source.name"
        class="source"
        >{{source.name}}</checkbox>
    </div>

    <loading v-if="loading" class="loading"/>

    <div class="news-feed">
      <div class="list-item" v-for="(item, i) in items" :key="i">

        <div v-if="item.type == 'month'" class="date-separator">
          <div class="container">
            <img src="~/assets/img/icons/megaphone.svg" class="decorator" v-if="i == 0">
            <h1 class="title">{{item.value}}</h1>
          </div>
          <div class="separator"/>
        </div>

        <div v-else-if="item.type == 'item'">
          {{item.name}}
        </div>
      </div>
    </div>


      <!--
    <h1 v-if="!blocks || !blocks.length || blocks.length == 0" class="no-results">Keine Ergebnisse</h1>
    <div v-else>

    <div class="news-feed" v-for="(month, index) in blocks" v-if="month.items.length" :key="index">
      <div class="date-separator" v-if="block.length">

        <div class="items">
          <transition-group name="items-transition">
            <news-feed-item
                            v-if="block[1].length == 1"
                            v-for="item in block[1]"
                            :news="item.content"
                            :key="item.id"
                            :type="'horizontal'"
                            />
          </transition-group>

          <div v-if="block[1].length > 1" class="news-block">
            <div class="column-left">
              <transition-group name="items-transition">
                <news-feed-item
                                v-for="(item, index) in block[1]"
                                v-if="index % 2 == 0"
                                :news="item.content"
                                :key="item.id"
                                />
              </transition-group>
            </div>

            <div class="column-right">
              <transition-group name="items-transition">
                <news-feed-item
                                v-for="(item, index) in block[1]"
                                v-bind:class="index % 2 == 1 ? '' : 'hidden-item'"
                                :news="item.content"
                                :key="item.id"
                                />
              </transition-group>
            </div>
          </div>
        </div>
      </div>
          -->
    </div>
  </section>
</template>

<script>
import moment from "moment";
import Checkbox from "~/components/Checkbox.vue";
import Loading from "~/components/Loading.vue";

export default {
  components: {
    Checkbox,
    Loading
  },

  data() {
    return {
      news: [],
      loading: false,
      sources: [
        { name: "magazin3", key: "m3", selected: false },
        { name: "youtube", key: "yt", selected: false },
        { name: "facebook", key: "fb", selected: false },
        { name: "twitter", key: "tw", selected: false },
        { name: "instagram", key: "ig", selected: false }
      ]
    };
  },

  created() {
    this.$watch("sources", this.update, { deep: true });
  },

  asyncData(context) {
    let filters = {
      filter_query: {
        component: {
          in: "news-item"
        }
      }
    };

    return context.store.dispatch("findNews", filters).then(data => {
      return { news: data.stories };
    });
  },

  methods: {
    update() {
      this.loading = true;

      let result = this.$store.dispatch("findNews", this.filters).then(data => {
        this.loading = false;
        this.news = data.stories;
      }).catch((e) => {
        console.log(e);
        this.loading = false;
      });
    }
  },

  computed: {
    items() {
      let temp = [];
      let currentMonth = null;
      this.news.forEach((n) => {
        let month = new Date(n.content.datetime).getMonth();
        if (currentMonth == null || currentMonth != month) {
          temp.push({ type: 'month', value: moment(n.content.datetime).lang('de-at').format('MMMM') });
          currentMonth = month;
        }
        temp.push({ type: 'item', ...n });
      });
      return temp;
    },
    filters() {
      const sources = this.sources
        .filter(i => i.selected)
        .map(i => i.key)
        .join(",");

      const filter_query = {
        component: { in: "news-item" }
      };

      if (sources) {
        filter_query["source"] = { in: sources };
      }

      return { filter_query };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.list-container {
}

/*
.list-item {
  display: inline-block;
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
*/




.no-results {
  width: 100%;
  text-align: center;
  margin-top: 100px;
}

.items-transition-enter-active,
.items-transition-leave-active {
  transition: all 0.5s;
}

.items-transition-enter,
.items-transition-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

.source-list {
  width: max-content;
  margin: 50px auto 0 auto;

  .source {
    margin: 5px 10px;
  }
}

.loading {
  margin-top: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.news-feed {
  .items {
    margin: 0 15%;
  }

  .date-separator {
    .container {
      margin: 100px auto 0 auto;
      width: 300px;

      .title {
        text-align: center;
        background-color: $color-blue;
        padding: 5px 10px;
        color: #fff;
        margin: 0;
        white-space: nowrap;
      }
    }

    .separator {
      border-bottom: 2px dashed $color-blue;
      width: 100%;
      margin-top: -1em;
    }

    .decorator {
      width: 50px;
      margin-bottom: -7px;
    }
  }
}

.news-block {
  display: flex;

  .column-right {
    width: 50%;
    margin-top: 200px;

    .hidden-item {
      display: none;
    }
  }

  .column-left {
    text-align: right;
    margin-right: 100px;
    width: 50%;
    .header {
      justify-content: flex-end;
    }
  }
}

@media (max-width: $mobile-large) {
  .column-right {
    width: 100% !important;

    .hidden-item {
      display: block !important;
    }
  }

  .column-left {
    display: none;
    width: 0%;
  }
}

@media (min-width: $mobile-small) {
  .source-list {
    display: flex;
  }
}
</style>
