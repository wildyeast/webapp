<template>
  <section>
    <div class="source-list">
      <checkbox
        :text="source.name"
        :checked="source.selected"
        :onchange="checkBoxVal => source.selected = checkBoxVal"
        v-for="source in sources"
        :key="source.name"
        class="source"
      />
    </div>

    <loading v-bind:class="loading ? 'loading loading-active' : 'loading' "/>

    <div class="news-feed" v-for="(block, index) in blocks" :key="index">
      <div class="date-seperator">
        <div class="container">
          <img src="~/assets/img/icons/megaphone.svg" class="decorator" v-if="index == 0">
          <h1 class="title">{{block[0]}}</h1>
        </div>

        <div class="seperator"/>
      </div>

      <div class="items">
        <news-feed-item
          v-for="item in block[1]"
          v-if="block[1].length == 1"
          :news="item.content"
          :key="item.id"
          :type="'horizontal'"
        />

        <div v-if="block[1].length > 1" class="news-block">
          <div class="column-left">
            <news-feed-item
              v-for="(item, index) in block[1]"
              v-if="index % 2 == 0"
              :news="item.content"
              :key="item.id"
            />
          </div>

          <div class="column-right">
            <news-feed-item
              v-for="(item, index) in block[1]"
              v-if="index % 2 == 1"
              :news="item.content"
              :key="item.id"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import checkbox from "~/components/Checkbox.vue";
import loading from "~/components/Loading.vue";

const monthDict = [
  "Jänner",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
];

export default {
  components: {
    checkbox,
    loading
  },

  data() {
    return {
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
      });
    }
  },

  computed: {
    blocks() {
      let _blocks = {};

      // Sort stories in chronological order (latest first)
      const stories = this.news.sort((a, b) => {
        const timeA = new Date(a.content.datetime).getTime();
        const timeB = new Date(b.content.datetime).getTime();

        return timeB - timeA;
      });

      stories.map(story => {
        const date = new Date(story.content.datetime);
        const month = monthDict[date.getMonth()];
        const year = date.getFullYear();
        const timeStamp = `${month} ${year}`;

        if (!_blocks[timeStamp]) {
          _blocks[timeStamp] = [];
        }

        _blocks[timeStamp].push(story);
      });

      // Convert object to array for usage on the page [ [ key, value ], ... ]
      return Object.entries(_blocks);
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

@media (min-width: 750px) {
  .source-block {
    display: flex;
  }
}

.source-list {
  width: max-content;
  margin: 50px auto 0 auto;
  display: flex;

  .source {
    margin: 0 10px;
  }
}

.loading {
  margin-top: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: none;
}

.loading-active {
  display: block;
}

.news-feed {
  .items {
    margin: 0 15%;
  }

  .date-seperator {
    .container {
      margin: 100px auto 0 auto;
      width: 250px;

      .title {
        text-align: center;
        background-color: $color-blue;
        padding: 5px;
        color: #fff;
        margin: 0;
        // transform: rotate(-3deg);
      }
    }

    .seperator {
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
  }

  .column-left {
    width: 50%;
    text-align: right;
    margin-right: 100px;
  }
}
</style>
