<template>
  <div v-editable="news" v-bind:class="'news-feed-item ' + type || 'vertical'">
    <div class="top">
      <a :href="link" target="_blank">
        <div class="header">
          <p v-if="news.datetime">{{date}}</p>
          <img v-if="news.source" class="source-img" :src="$resizeImage(`/icons/${news.source}.png`, '700x0')">
        </div>
        <img class="image" :src="news.image">
      </a>
    </div>

    <div class="bot">
      <a :href="link" target="_blank">
        <div class="header">
          <p v-if="news.datetime">{{date}}</p>
          <img v-if="news.source" class="source-img" :src="$resizeImage(`/icons/${news.source}.png`, '700x0')">
        </div>

        <h4 class="title">{{news.title}}</h4>
        <span class="text">{{news.text}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["news", "type"],
  computed: {
    date() {
      return new Date(this.news.datetime).toLocaleDateString("de-at");
    },
    link() {
      if (this.news.link && this.news.link.url) {
        return this.news.link.url;
      } else {
        return '#'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.news-feed-item {
  margin-top: 69px;

  a {
    display: block;
    width: 100%;
    text-decoration: none;
    color: #000;
  }

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
