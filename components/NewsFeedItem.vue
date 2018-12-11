<template>
  <div v-editable="news" v-bind:class="'news-feed-item ' + type || 'vertical'">
    <div class="top">
      <div class="header">
        <p>{{date}}</p>
        <img class="source-img" :src="`/icons/${news.source}.png`">
      </div>

      <img class="image" :src="news.image">
    </div>

    <div class="bot">
      <div class="header">
        <p class>{{date}}</p>
        <img class="source-img" :src="`/icons/${news.source}.png`">
      </div>

      <h4 class="title">{{news.title}}</h4>
      <span class="text">{{news.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["news", "type"],
  computed: {
    date() {
      return new Date(this.news.datetime).toLocaleDateString("de-at");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.news-feed-item {
  margin-top: 69px;

  .top .header {
    display: flex;
  }

  .bot {
    .title {
      margin: 15px 0;
      font-weight: bold;
      font-size: 2rem;
    }

    .header {
      display: none;
    }

    .text {
      font-size: 1rem;
      font-family: $font-mono;
      line-height: 150%;
    }
  }

  .header {
    display: flex;
    margin: 20px 0;

    .source-img {
      height: 1em;
      width: auto;
      margin-left: 20px;
    }

    p {
      margin: 0;
      font-size: 1rem;
      font-family: $font-mono;
    }
  }

  .image {
    width: 100%;
  }
}

@media (min-width: $mobile-large) {
  .news-feed-item {
    .top .header {
      display: none;
    }

    .bot .header {
      display: flex;
    }
  }

  .horizontal {
    display: grid;
    grid-gap: 100px;
    grid-template-columns: 1fr 3fr;
    text-align: left;
  }
}
</style>
