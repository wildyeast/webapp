<template>
  <div v-editable="news" class="news-feed-item">
    <div v-if="!type || type == 'vertical'" class="container">
      <div class="header">
        {{new Date(news.datetime).toLocaleDateString("de-at")}}
        {{news.source}}
      </div>

      <img :src="news.image">
      <h4 class="title">{{news.title}}</h4>
      <span class="text">{{news.text}}</span>
    </div>

    <div v-if="type == 'horizontal'" class="container container-horizontal">
      <img :src="news.image">

      <div>
        <div class="header">
          {{new Date(news.datetime).toLocaleDateString("de-at")}}
          {{news.source}}
        </div>

        <h4 class="title">{{news.title}}</h4>
        <span class="text">{{news.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["news", "type"]
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.news-feed-item {
  margin-top: 69px;

  .container-horizontal {
    display: flex;
    text-align: left;

    img {
      // margin-top: 100px;
      width: 50% !important;
      height: 50% !important;
    }
  }

  .container {
    margin: 10%;

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    .header {
      font-weight: bold;
      padding: 5px 0;
    }

    .title {
      margin: 15px 0;
      font-weight: bold;
      font-size: 2rem;
    }

    .text {
      font-size: 1rem;
      font-family: $font-mono;
    }
  }
}
</style>
