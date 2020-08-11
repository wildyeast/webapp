<template>
  <div class="training-item" v-if="course">
    <div class="body">
      <div class="content">
        {{course.name}}
      </div>
      <div class="course-info" v-if="!memberCourse">
        <button class="" @click="startCourse">Kurs starten</button>
      </div>
      <div v-else class="info">
        <div class="course-info"><span>gestartet am: {{createdDate}}</span></div>
        <div class="course-info"><!--<span>Praxistest: {{!!memberCourse.manual_activation}}</span>-->
          <span>Praxistest: </span>
          <img v-if="memberCourse.manual_activation == 0" src="~/assets/img/icons/times-solid.svg" class="status">
          <img v-if="memberCourse.manual_activation != 0" src="~/assets/img/icons/check-solid.svg" class="status"></div>
        <div class="course-info"><!--<span>Online-Quiz: {{!!memberCourse.is_valid}}</span>-->
          <span>Online-Quiz: </span>
          <img v-if="memberCourse.is_valid == 0" src="~/assets/img/icons/times-solid.svg" class="status">
          <img v-if="memberCourse.is_valid != 0" src="~/assets/img/icons/check-solid.svg" class="status">
          <p v-if="memberCourse.is_valid != 0 && memberCourse.manual_activation == 0">Als nächstes musst du nur noch den Kurs von einem Host oder am Frontdesk freischalten lassen.</p>
          <p v-if="memberCourse.is_valid != 0 && memberCourse.manual_activation != 0" style="color: green"> Der Kurs ASU ist abgeschlossen</p>

        </div>
        <div v-if="!memberCourse.is_valid" class="course-info">
          <button class="" @click="takeQuiz">Quiz starten</button>
        </div>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script>
export default {
  props: ['course'],
  methods: {
    takeQuiz() {
      this.$router.push({ path: `/course/${this.course.id}` });
    },
    startCourse() {
      this.$store.dispatch("startCourse", { course_id: this.course.id }).then((memberCourse) => {
        this.$store.dispatch("getMemberCourses").then(() => {
          this.takeQuiz();
        });
      });
    }
  },
  computed: {
    memberCourse() {
      console.log(this.$store.getters.getMemberCourseById(this.course.id));
      return this.$store.getters.getMemberCourseById(this.course.id);
    },
    createdDate() {
      return new Date(this.memberCourse.created_at).toLocaleDateString("de-at");
    },
    updatedDate() {
      return new Date(this.memberCourse.updated_at).toLocaleDateString("de-at");
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';
.training-item {
  margin-bottom: 5px;
  background-color: #FFF;
  padding: 0 10px;
  .body {
    padding: 10px 0;
    color: $color-orange;
    display: flex;
    @include media-breakpoint-down(sm) {
      display: block;
    }
    .content {
      flex: 1;
      @include media-breakpoint-down(sm) {
        border-bottom: 1px solid #d3d3d3;
        padding: 10px 0;
      }
    }
    .course-info {
      padding: 10px;
      @include media-breakpoint-down(sm) {
        padding: 10px 0;
      }
    }
  }
  .footer {
    font-size: 0.8em;
    padding: 5px 0;
    color: #333;
  }
}
  .status {
    width: 5%;
  }
.info {
  @include media-breakpoint-up(sm) {
    width: 25%;
  }
}
</style>
