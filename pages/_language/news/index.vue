<template>
  <section>
    <div class="source-list">
      <div v-for="s in sources" :key="s.key" class="source">
        <input type="checkbox" v-model="s.selected" :name="s.key" :id="s.key">
        <label :for="s.key">{{s.name}}</label>
      </div>
    </div>

    <div class="news-feed" v-for="(month, index) in blocks" :key="index">
      <div class="date-seperator">
        <h1 class="title">{{month[0]}}</h1>
        <div class="seperator"/>
      </div>

      <div class="news-block">
        <div class="column-left">
          <news-feed-item
            v-for="(item, index) in month[1]"
            v-if="index % 2 == 0"
            :news="item.content"
            :key="item.id"
          />
        </div>

        <div class="column-right">
          <news-feed-item
            v-for="(item, index) in month[1]"
            v-if="index % 2 == 1"
            :news="item.content"
            :key="item.id"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
  "November",
  "Dezember"
];

export default {
  data() {
    return {
      blocks: [],
      sources: [
        { name: "Magazin3", key: "m3", selected: false },
        { name: "Youtube", key: "yt", selected: false },
        { name: "Facebook", key: "fb", selected: false },
        { name: "Twitter", key: "tw", selected: false },
        { name: "Instagram", key: "ig", selected: false }
      ]
    };
  },

  created() {
    let blocks = {};
    const _stories = this.stories.sort((a, b) => {
      const timeA = new Date(a.content.datetime).getTime();
      const timeB = new Date(b.content.datetime).getTime();
      return timeB - timeA;
    });

    // Generating entries for the months in the "months"-object
    monthDict.map(month => (blocks[month] = []));

    _stories.map(story => {
      const date = new Date(story.content.datetime);
      const month = monthDict[date.getMonth()];
      const year = date.getFullYear();
      const stamp = `${month} ${year}`;

      if (!blocks[stamp]) {
        blocks[stamp] = [];
      }

      blocks[stamp].push(story);
    });

    // Removing empty months
    this.blocks = Object.entries(blocks).filter(month => month[1].length);
    this.$watch(
      "sources",
      (newVal, oldVal) => {
        this.update();
      },
      { deep: true }
    );
  },

  asyncData(context) {
    let filters = {
      filter_query: {
        component: {
          in: "news-item"
        }
      }
    };
    return context.store.dispatch("findNews", filters);
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
    filters() {
      let ss = this.sources
        .filter(i => {
          return i.selected;
        })
        .map(i => {
          return i.key;
        })
        .join(",");

      let filter_query = {
        component: {
          in: "news-item"
        }
      };

      if (ss) {
        filter_query["source"] = {
          in: ss
        };
      }

      return {
        filter_query
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.news-feed {
  .date-seperator {
    .title {
      margin: 100px auto 0 auto;
      width: 200px;
      text-align: center;
      background-color: $color-blue;
      padding: 5px;
      color: #fff;
      // transform: rotate(-3deg);
    }

    .seperator {
      border-bottom: 2px dashed $color-blue;
      width: 100%;
      margin-top: -1em;
    }
  }
}

.news-block {
  display: grid;
  grid-template-columns: 50% 50%;

  .column-right {
    margin-top: 200px;
  }

  .column-left {
    text-align: right;
  }
}
</style>
