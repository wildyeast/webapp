<template>
  <div>
    <div class="preview-wrapper">
      <div class="member-preview">
        <nuxt-link v-if="story" class="story" :to="'/' + story.full_slug">
          <h3 class="name">{{member.name}}</h3>
          <p class="title">{{member.title}}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["story"],
  computed: {
    member() {
      return this.story.content;
    }
  },
  methods: {
    open() {
      this.$router.push({ path: this.story.full_slug });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  .member-preview {
    padding: 20px;
    width: 100%;

    .story {
      display: block;
      padding: 10px;
      cursor: pointer;
      text-decoration: none;
      color: #000;

      &:hover {
        background-color: $color-yellow;
      }

      .banner {
        height: 200px;
        background-size: cover;
        background-position: center;
      }

      h3.title {
        font-weight: normal;
        font-size: 1.5rem;
        font-family: $font-secondary;
      }

      p.teaser {
        font-size: 1rem;
        font-family: $font-mono;
      }
    }
  }
}
</style>
