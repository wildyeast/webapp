<template>
  <div v-editable="blok" class="team-wrapper">
    <img class="image" :src="$resizeImage(blok.image, '1600x0')">
    <div class="team">
      <div class="headline">
        Die
        <span class="strike">Maschinen</span>
        <br>Menschen dahinter
      </div>
      <div class="subline">
        <markdown :value="blok.text"></markdown>
      </div>
      <div class="member-grid">
        <team-member-preview :key="id" v-for="id in blok.team" :id="id"></team-member-preview>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blok"],
  data() {
    return {};
  },
  computed: {}
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.team-wrapper {
  padding-left: 15%;
  padding-top: 15%;
  position: relative;

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

    padding: 100px;
    background-color: #fff;

    .headline {
      font-weight: bold;
      font-size: 3.2rem;
      margin-bottom: 20px;
      text-transform: uppercase;
      .strike {
        text-decoration: line-through;
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

      .member-item {
        width: 100%;
      }

      @media (min-width: $mobile-large) {
        display: grid;
      }
    }
  }
}
</style>
