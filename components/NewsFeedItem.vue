<template>
  <div v-editable="news" class="news-feed-item">
    <div class="container">
      <div class="header">
        {{new Date(news.datetime).toLocaleDateString()}}
        {{news.source}}
      </div>

      <img :src="news.image" alt>
      <h4 class="title">{{news.title}}</h4>
      <span class="text">{{news.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["news"]
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.news-feed-item {
  margin-top: 69px;

  .container {
    margin: 5em;

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
