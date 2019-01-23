<template>
  <div v-if="story">
    <div class="preview-wrapper">
      <div class="workshop-preview">
        <nuxt-link v-if="story" class="story" :to="story.full_slug">
          <div class="banner" :style="{ 'background-image': 'url(' + $resizeImage(workshop.image, '700x0') + ')' }"></div>
          <h3 class="title">{{workshop.title}}</h3>
          <p class="teaser">{{workshop.teaser}}</p>
        </nuxt-link>
        <div class="loading" v-else>
          <div class="banner" :style="{ 'background-image': 'url(//placehold.it/700x300)' }"></div>
          <h3 class="title"></h3>
          <p class="teaser"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      story: null,
    }
  },
  computed: {
    workshop() {
      return this.story.content;
    }
  },
  created() {
    this.$store.app.$storyapi.get(`cdn/stories/${this.id}`, {
      find_by: 'uuid'
    }).then((res) => {
      this.story = res.data.story;
    }).catch((e) => {
      console.log('error', e);
    });
  },
  methods: {
    open() {
      this.$router.push({ path: this.story.full_slug });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;


  .workshop-preview {
    padding: 20px;
    width: 600px;

    .loading {
    }

    .loading,
    .story {
      display: block;
      padding: 10px;
      cursor: pointer;
      text-decoration: none;
      color: #000;

      &:hover {
        background-color: lighten($color-bright-bg, 3);
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
