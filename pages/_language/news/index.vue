<template>
  <section class="news-page">
    <!--
    <div class="source-list">
      <checkbox
         theme="news"
         v-model="source.selected"
         v-for="source in sources"
         :key="source.name"
         class="source"
         >{{source.name}}</checkbox>
    </div>
    -->

    <loading v-if="loading" class="loading"/>

    <div class="news-feed">
      <div class="month" v-for="(month, mi) in items">
        <div class="container">
          <img src="~/assets/img/icons/megaphone.svg" class="decorator" v-if="mi == 0">
          <h1 class="title">{{month.label}}</h1>
        </div>
        <div class="separator"/>

        <div v-if="month.items && month.items.length == 1">
          <div class="item" v-for="(item, ii) in month.items" :key="ii">
            <news-feed-item :news="item.content" :key="item.id" type="horizontal" />
          </div>
        </div>
        <div v-else-if="month.items && month.items.length > 1" class="items">
          <div class="item" v-for="(item, ii) in month.items" :key="ii">
            <news-feed-item :news="item.content" :key="item.id" type="vertical" />
          </div>
        </div>
      </div>
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
      let list = [];
      let temp = [];
      let currentMonth = null;
      this.news.forEach((n) => {
        let month = new Date(n.content.datetime).getMonth();
        if (currentMonth != month) {
          if (currentMonth != null) {
            list.push({ items: temp, label: moment(n.content.datetime).locale('de-at').format('MMMM') });
          }
          currentMonth = month;
          temp = [];
        }
        temp.push({ type: 'item', ...n });
      });
      return list;
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

.news-page {
  .no-results {
    width: 100%;
    text-align: center;
    margin-top: 100px;
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
    margin-right: 4%;
    margin-left: 4%;

    .month {
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

      .items {
        column-count: 2;
        column-gap: 2em;
        @include media-breakpoint-down(sm) {
          column-count: 1;
        }

        .item {
          display: inline-block;
          margin: 0 0 2em;
          width: 100%;
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
}

@media (min-width: $mobile-small) {
  .source-list {
    display: flex;
  }
}
</style>
