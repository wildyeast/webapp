<template>
  <div class="training-item" v-if="course">
    <div class="body">
      <div class="content">
        <span class="course-heading"><b>{{course.name}}</b></span>
      <!--</div>-->
      <div class="course-info" v-if="!memberCourse">
        <button class="input-button-primary" @click="startCourse">Kurs starten</button>
      </div>
      <!--<div v-else class="info">-->
        <div class="course-info"><span>gestartet am: {{createdDate}}</span></div>
        <div class="course-info"><!--<span>Praxistest: {{!!memberCourse.manual_activation}}</span>-->
          <span>Praxistest: </span>
          <img v-if="memberCourse.manual_activation == 0" src="~/assets/img/icons/times-solid.svg" class="status-course">
          <img v-if="memberCourse.manual_activation != 0" src="~/assets/img/icons/check-solid.svg" class="status-course"></div>
        <div class="course-info"><!--<span>Online-Quiz: {{!!memberCourse.is_valid}}</span>-->
          <span>Online-Quiz: </span>
          <img v-if="memberCourse.is_valid == 0" src="~/assets/img/icons/times-solid.svg" class="status-course">
          <img v-if="memberCourse.is_valid != 0" src="~/assets/img/icons/check-solid.svg" class="status-course">
          <p v-if="memberCourse.is_valid != 0 && memberCourse.manual_activation == 0">Als nächstes musst du nur noch den Kurs von einem Host oder am Frontdesk freischalten lassen.</p>
          <p v-if="memberCourse.is_valid != 0 && memberCourse.manual_activation != 0" style="color: green"> Der Kurs ASU ist abgeschlossen</p>

        </div>
        <div v-if="!memberCourse.is_valid" class="course-info">
          <button class="input-button-primary" @click="takeQuiz">Quiz starten</button>
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
  background-color: #FFF;
  border: 1px solid #ff8c33;
  border-radius: 5px;
  padding: 0 10px;
  @include media-breakpoint-up(sm) {
    float: left;
    margin: 20px 20px;
    padding: 0 10px;
    padding-top: 20px;
    width: 33%;
  }
  @include media-breakpoint-down(sm) {
    padding: 10px 20px;
  }
  .body {
    padding: 10px 0;
    color: $color-orange;
    // display: flex;
    @include media-breakpoint-down(sm) {
      display: block;
    }
    .content {
      flex: 1;
    }
    .course-info {
      padding: 10px;
      @include media-breakpoint-down(sm) {
        padding: 10px 0;
      }
    }
    .course-heading {
      padding: 10px 10px;
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
  .status-course {
    float: right;
    width: 5%;
  }
.info {
  @include media-breakpoint-up(sm) {
    flex: 1;
    width: 25%;
  }
}
.input-button-primary {
  cursor: pointer;
  background-color: #ff6f00;
  color: #FFF;
  border: 1px solid #ff8c33;
  padding: 7px 12px 8px;
  line-height: 1;
  outline: none;
  align-self: center;
  margin-top: 20px;
  /*@include media-breakpoint-up(sm) {
    position: absolute;
    left: 48%;
    right: 45%;
  }
  @include media-breakpoint-down(sm) {
    position: absolute;
    left: 38%;
    right: 33%;
  }*/
}
</style>
