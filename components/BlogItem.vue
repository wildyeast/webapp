<template>
  <div class="blog-item-display">
    <section class="header">
      <div class="title-head">
        <code class="title">{{content.title}}</code>
        <p class="date" v-if="content.datetime">{{content.datetime | date}}</p>
      </div>
      <img class="image" :src="content.image">
    </section>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss"  scoped>
@import '/assets/scss/styles.scss';

.header{
  @media (max-width: 1460px) {
    padding-bottom: 5vh;
  }
}
.date{
  font-family: $font-secondary;
  font-size: 1.3rem;
}
.title{
    font-size: 1.8rem;
    font-family: $font-secondary;
    line-height: 1.4;
    letter-spacing: 1.4px;
}

.image{
  width: 25vw;
  height: 20vw;
  @media (max-width: 1460px) {
  width: 50vw;
  height: 40vw;
}}
</style>
