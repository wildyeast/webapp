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

// const sourceDict = {
//   m3: "Magazin3",
//   yt: "Youtube",
//   fb: "Facebook",
//   tw: "Twitter",
//   ig: "Instagram"
// };

export default {
  data() {
    return {
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
      const _stories = this.news.sort((a, b) => {
        const timeA = new Date(a.content.datetime).getTime();
        const timeB = new Date(b.content.datetime).getTime();
        return timeB - timeA;
      });

      // Generating entries for the months in the "months"-object
      monthDict.map(month => (_blocks[month] = []));

      _stories.map(story => {
        const date = new Date(story.content.datetime);
        const month = monthDict[date.getMonth()];
        const year = date.getFullYear();
        const stamp = `${month} ${year}`;

        if (!_blocks[stamp]) {
          _blocks[stamp] = [];
        }

        _blocks[stamp].push(story);
      });

      return Object.entries(_blocks).filter(month => month[1].length);
    },

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

.source-list {
  width: max-content;
  margin: 50px auto 0 auto;
  display: flex;

  .source {
    margin: 0 10px;

    input {
      background-color: #f00;
    }
  }
}

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
