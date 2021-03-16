<template>
  <div class="section">
    <div>
      <h2>Einschulungen</h2>
      <div class="courseContainer">
        <Course v-for="course of courses" :course="course" /></li>
      </div>
    </div>
    <div>
<!--    <h2>Fabman Trainings</h2>-->
<!--    <ul class="item-list" v-if="user.trainings && user.trainings.length > 0">-->
<!--      <li v-for="t in user.trainings"><training :userTraining="t" /></li>-->
<!--    </ul>-->
<!--    <div v-else>-->
<!--      <code>Noch keine Trainings vorhanden</code>-->
<!--      <div class="link-with-arrow">-->
<!--        <div class="link-text">-->
<!--          <div class="link-arrow">-->
<!--          </div>-->
<!--          <Nuxt-Link to="/de/workshops">Zu den Workshops</Nuxt-Link>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
  </div>
</template>

<script>
import Course from "@/components/Course";
export default {
  middleware: 'authenticated',
  components: {
    Course
  },
  data () {
    return {}
  },
  created() {
  },
  methods: {
  },
  computed: {
    memberCourses() {
      return this.$store.state.memberCourses;
    },
    courses() {
      return this.$store.state.courses;
    },
    user() {
      return this.$store.state.user;
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';
.section {
  display: flex;
  flex-direction: column;
}
.courseContainer {
  display: flex;
  flex-wrap: wrap;
}
.link-with-arrow {
  .link-text {
    a {
      text-transform: uppercase;
      color: $color-blue;
    }
    margin: 1em 0 .5em;
    display: flex;
    align-items: center;
    min-width: 200px;
    .link-arrow {
      border-top: $color-blue 1px solid;
      width: 1em;
      position: relative;
      margin-right: .3em;
      &:before {
        position: absolute;
        right: 0;
        content: "";
        border-top: $color-blue 1px solid;
        border-right: $color-blue 1px solid;
        transform: rotateZ(45deg);
        transform-origin: top right;
        height: .3em;
        width: .3em;
        margin-top: -.5px;
      }
    }
  }
}

</style>
