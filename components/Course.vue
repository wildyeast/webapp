<template>
  <div class="training-item" v-if="course">
    <div class="body">
      <div class="content">
        <div class="top">
          <span class="course-heading"><b>{{ course.name }}</b></span>
        </div>
        <div class="bottom">
          <div class="course-info" v-if="!memberCourse">
            <button class="input-button-primary" @click="startCourse">Kurs starten</button>
          </div>
          <!--<div v-else class="info">-->
          <div class="course-info"><span>gestartet am: {{ createdDate }}</span></div>
          <div class="course-info"><!--<span>Praxistest: {{!!memberCourse.manual_activation}}</span>-->
            <span>Praxistest: </span>
            <img v-if="memberCourse.manual_activation == 0" src="~/assets/img/icons/times-solid.svg"
                 class="status-course">
            <img v-if="memberCourse.manual_activation != 0" src="~/assets/img/icons/check-solid.svg"
                 class="status-course"></div>
          <div class="course-info"><!--<span>Online-Quiz: {{!!memberCourse.is_valid}}</span>-->
            <span>Online-Quiz: </span>
            <img v-if="memberCourse.is_valid == 0" src="~/assets/img/icons/times-solid.svg" class="status-course">
            <img v-if="memberCourse.is_valid != 0" src="~/assets/img/icons/check-solid.svg" class="status-course">
            <p v-if="memberCourse.is_valid != 0 && memberCourse.manual_activation == 0">Als nächstes musst du nur noch
              den Kurs von einem Host oder am Frontdesk freischalten lassen.</p>
            <p v-if="memberCourse.is_valid != 0 && memberCourse.manual_activation != 0" style="color: green"> Der Kurs
              ASU ist abgeschlossen!</p>

          </div>
          <div v-if="!memberCourse.is_valid" class="course-info">
            <button class="input-button-primary" @click="takeQuiz">Quiz starten</button>
          </div>
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
  computed: {
    memberCourse() {
      return this.$store.getters.getMemberCourseById(this.course.id);
    },
    createdDate() {
      return new Date(this.memberCourse.created_at).toLocaleDateString("de-at");
    },
    updatedDate() {
      return new Date(this.memberCourse.updated_at).toLocaleDateString("de-at");
    }
  },
  mounted() {
    // TODO check if I have permission
  },
  methods: {
    takeQuiz() {
      this.$router.push({path: `/course/${this.course.id}`});
    },
    startCourse() {
      this.$store.dispatch("startCourse", {course_id: this.course.id}).then((memberCourse) => {
        this.$store.dispatch("getMemberCourses").then(() => {
          this.takeQuiz();
        });
      });
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.training-item {
  background: url('http://img2.storyblok.com/1600x0/f/47294/3000x1688/f308edf976/pcb-leiterplattendesign-kicad-storyblok.png') no-repeat;
  width: 20em;
  height: 26em;
  position: relative;
  border: 1px solid black;

  .body {
    // display: flex;
    .content {
      flex: 1;
    }

    .course-info {
      padding: 0.3em 0;
    }

    .course-heading {
      background: white;
      font-size: 1.5em;
      font-family: $font-mono;
    }
  }

  .footer {
    font-size: 0.8em;
    color: #333;
  }
}

.status-course {
  float: right;
  width: 5%;
}

.top {
  padding: 1em;
  line-height: 1.8em;
}

.bottom {
  background: white;
  position: absolute;
  bottom: 0;
  height: 10em;
  width: 100%;
  padding: 0.3em;
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

.input-button-primary:disabled {
  cursor: default;
  background-color: grey;
  border: 1px solid darkgrey;
}

.input-button-primary:hover {
  color: black;
}

.input-button-back {
  @extend .input-button-primary;
}

.input-button-payment {
  @extend .input-button-primary;
  font-weight: bold;
  // background-color: #ff4400;
}
</style>
