<template>
  <div v-editable="news.content" :class="'news-feed-item ' + type || 'vertical'" v-if="news.content && news.content.component == 'news-overview' && news.content != 'Header'">
    <div class="top">
      <!--<a :href="link" target="_blank">-->
      <Nuxt-link :to="{ path: './'+news.slug}" class="link">
        <div class="header">
          <p class="date" v-if="news.content.datetime">{{news.content.datetime | date}}</p>
          <img v-if="news.content.source && news.content.source.length != 0" class="source-img" :src="`/icons/${news.content.source}.png`">
        </div>
        <img class="image" :src="$resizeImage(news.content.image, '600x0')">
      </Nuxt-link>
      <!--</a>-->
    </div>

    <div class="bot">
      <!--<a :href="link" target="_blank">
        <nuxt-link :to="{ path: '/news/detail', query: { item: news }}" class="link">-->
      <nuxt-link :to="{ path: './'+news.slug}" class="link">
        <div class="header">
          <p class="date" v-if="news.content.datetime">{{news.content.datetime | date}}</p>
          <img v-if="news.content.source && news.content.source.length != 0" class="source-img" :src="`/icons/${news.content.source}.png`">
        </div>
        <h4 class="title">{{news.content.title}}</h4>
        <span class="text">{{news.content.teaser}}</span>
      </nuxt-link>
      <!--</a>-->
    </div>
  </div>
  <div v-else-if="news.content != 'Header'" :class="'news-feed-item ' + type || 'vertical'">
    <div class="top">
      <!--<a :href="link" target="_blank">-->
      <Nuxt-link :to="{ path: './'+news.slug}" class="link">
        <div class="header">
          <p class="date" v-if="news.datetime">{{news.datetime | date}}</p>
          <img v-if="news.source" class="source-img" :src="`/icons/${news.source}.png`">
        </div>
        <img class="image" :src="$resizeImage(news.image, '600x0')">
      </Nuxt-link>
      <!--</a>-->
    </div>

    <div class="bot">
      <!--<a :href="link" target="_blank">
        <nuxt-link :to="{ path: '/news/detail', query: { item: news }}" class="link">-->
      <nuxt-link :to="{ path: './'+news.slug}" class="link">
        <div class="header">
          <p class="date" v-if="news.datetime">{{news.datetime | date}}</p>
          <img v-if="news.source && news.source.length != 0" class="source-img" :src="`/icons/${news.source}.png`">
        </div>
        <h4 class="title">{{news.content}}</h4>
      </nuxt-link>
      <!--</a>-->
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  export default {
    props: {
      news : {},
    },
    data() {
      return {
        type: null,
        link: null,
        loading: false,
        sources: [
          { name: "magazin3", key: "m3", selected: false },
          { name: "youtube", key: "yt", selected: false },
          { name: "facebook", key: "fb", selected: false },
          { name: "twitter", key: "tw", selected: false },
          { name: "instagram", key: "ig", selected: false }
        ],
      };
    },
    created() {
      // this.getStory();
      console.log(this.news);
    },
    computed: {
      getStory(){
        // console.log(this.news);
      }
    },
    asyncData (context) {
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
        margin: 0 20px;
      }
      p {
        margin: 0;
        font-size: 1rem;
        font-family: $font-mono;
      }
    }
    .image {
      max-width: 100%;
      max-height: 50vh;
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
