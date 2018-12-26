<template>
  <section>
    <div class="team-wrapper">
      <img class="image" :src="$resizeImage(story.content.image, '1600x0')">
      <div class="team">
        <div class="headline">
          Die
          <span class="strike">Maschinen</span>
          <br>Menschen dahinter
        </div>
        <div class="subline">
          <markdown :value="story.content.introduction"></markdown>
        </div>
        <div class="member-grid">
          <team-member-preview :key="m.id" v-for="m in members" :story="m"></team-member-preview>
        </div>
      </div>
    </div>
    <div
      class="image-footer"
      :style="{ 'background-image': 'url(' + $resizeImage(story.content.footerImage, '1600x0') + ')' }"
    ></div>
    <!--
    <component v-if="story && story.content && story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component" />
    -->
  </section>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview";

export default {
  data() {
    return {
      story: null
    };
  },
  mixins: [storyblokLivePreview],
  async asyncData(context) {
    let team = await context.store
      .dispatch("loadTeam")
      .catch(e => {
        context.error({
          statusCode: e.response.status,
          message: e.response.statusText
        });
      })
      .then(res => {
        return { members: res.stories };
      });
    let page = await context.store.dispatch("loadPage", "/team").catch(e => {
      context.error({
        statusCode: e.response.status,
        message: e.response.statusText
      });
    });
    return { ...team, ...page };
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";
.team-wrapper {
  padding-left: 15%;
  padding-top: 15%;
  position: relative;

  @media (max-width: $mobile-small) {
    padding-left: 0;
    padding-top: 200px;
  }

  .image {
    display: block;
    width: 100%;
    height: auto;
    z-index: -1;
    max-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .team {
    display: flex;
    flex-direction: column;
    padding: 40px;
    background-color: #fff;

    @media (max-width: $mobile-small) {
      padding: 20px;
    }

    .headline {
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 3.2rem;
      text-transform: uppercase;
      .strike {
        text-decoration: line-through;
      }

      @media (max-width: $mobile-small) {
        font-size: 2.5rem;
      }
    }

    .subline {
      font-family: $font-mono;
      font-size: 1.2rem;
      margin-bottom: 80px;
      line-height: 1.5;
    }

    .member-filters {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: 10px;

      .department-label {
        margin: 0 5px;
        background-color: #eee;
        padding: 2px 5px;

        label {
          display: block;
          user-select: none;
          padding: 10px;
        }

        input {
          display: none;
        }

        &.active {
          background-color: $color-orange;
          color: #fff;
        }
      }
    }

    .member-grid {
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;

      .member-item {
        width: 100%;
      }

      @media (min-width: $mobile-large) {
        display: grid;
      }
    }
  }
}

.image-footer {
  height: 50vh;
  background-size: cover;
  background-position: center;
}

</style>
