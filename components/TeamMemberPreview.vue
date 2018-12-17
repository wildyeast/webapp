<template>
  <div>
    <div class="preview-wrapper">
      <div class="member-preview">
        <nuxt-link v-if="story" class="story" :to="'/' + story.full_slug">
          <h2 class="name">{{member.name}}</h2>
          <div class="info">
            <p class="title">{{member.title}}</p>

            <div class="phone" v-if="member.phone">
              <img src="~/assets/img/icons/phone.svg">
              <p>{{member.phone}}</p>
            </div>

            <div class="email" v-if="member.email">
              <img src="~/assets/img/icons/envelope.svg">
              <p>{{member.email}}</p>
            </div>
          </div>
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
  min-height: 150px;
  display: flex;
  justify-content: center;

  .email {
    visibility: hidden;
  }

  .phone {
    display: none;
  }

  .member-preview {
    width: 100%;

    .phone {
      display: none;
    }

    .email {
      display: flex;
    }

    .phone, .email {

      img {
        margin: 7px 15px 0 0;
        width: auto;
        height: .9em;
      }
    }

    .story {
      display: block;
      padding: 30px;
      cursor: pointer;
      text-decoration: none;
      color: #000;

      .banner {
        height: 200px;
        background-size: cover;
        background-position: center;
      }

      .name {
        margin: 0 0 20px 0;
        font-size: 1.5rem;
        font-family: $font-secondary;
      }

      .info {
        p {
          margin: 6px 0 0 0;
        }

        font-size: 1rem;
        font-family: $font-mono;
      }
    }
  }

  .member-preview:hover {
    background-color: $color-yellow;

    .title {
      display: none;
    }

    .phone {
      display: flex;
    }

    .email {
      visibility: visible;
    }
  }
}
</style>
