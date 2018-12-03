<template>
  <section>
    <div class="source-list">
      <div v-for="s in sources" :key="s.key" class="source">
        <input type="checkbox" v-model="s.selected"  :name="s.key" :id="s.key"/>
        <label :for="s.key">{{s.name}}</label>
      </div>
    </div>
    <div class="news-feed" v-for="(month, index) in months" :key="index">
      <div class="date-seperator">
        <h1 class="title">{{month[0]}}</h1>
        <div class="seperator"/>
      </div>

      <div class="news-block">
        <news-feed-item v-for="item in month[1]" :news="item.content" :key="item.id"/>
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
    console.log("data");

    return {
      months: [],
      sources: [
        { name: 'Magazin3', key: 'm3', selected: false },
        { name: 'Youtube', key: 'yt', selected: false },
        { name: 'Facebook', key: 'fb', selected: false },
        { name: 'Twitter', key: 'tw', selected: false },
        { name: 'Instagram', key: 'ig', selected: false },
      ],
    };
  },

  created() {
    console.log("created");

    let months = {};

    this.stories.map(story => {
      const month = monthDict[new Date(story.content.datetime).getMonth()];

      if (!months[month]) {
        months[month] = [];
      }

      months[month].push(story);
      console.log(month);
    });

    this.months = Object.entries(months);

    this.$watch('sources', (newVal, oldVal) => {
      this.update();
    }, { deep: true });
  },

  asyncData(context) {
    let filters = {
      filter_query: {
        'component': {
          'in': 'news-item'
        }
      },
    };
    return context.store.dispatch("findNews", filters);
  },

  methods: {
    update() {
      this.loading = true;
      let result = this.$store.dispatch("findNews", this.filters).then((data) => {
        this.loading = false;
        this.news = data.stories;
      });
    }
  },

  computed: {
    filters() {
      let ss = this.sources.filter((i) => {
        return i.selected;
      }).map((i) => {
        return i.key
      }).join(',');

      let filter_query = {
        'component': {
          'in': 'news-item'
        },
      };

      if (ss) {
        filter_query['source'] = {
          'in': ss
        }
      }

      return {
        filter_query
      }
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.news-feed {
  .date-seperator {
    .title {
      margin: 0 auto;
      width: max-content;
      background-color: $color-blue;
      padding: 5px;
      color: #fff;
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
}

.news-feed-item:nth-child(2n) {
  text-align: left;
}

.news-feed-item:nth-child(2) {
  margin-top: 200px;
}
</style>
