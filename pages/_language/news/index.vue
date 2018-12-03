<template>
  <section>
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
      months: []
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
  },

  asyncData(context) {
    let filters = {};
    return context.store.dispatch("findNews", filters);
  }
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