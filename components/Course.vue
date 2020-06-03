<template>
  <div class="training-item" v-if="course">
    <div class="body">
      <div class="content">
        <div class="col first">
          <h4>{{course.name}}</h4>
          <div class="scoretable" v-if="memberCourse">
            <div class="score">
              <span>Praxistest</span>
              <svg v-if="!memberCourse.manual_activation" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="x-circle" role="presentation" class="fill-current text-danger"><path fill="red" d="M4.93 19.07A10 10 0 1 1 19.07 4.93 10 10 0 0 1 4.93 19.07zm1.41-1.41A8 8 0 1 0 17.66 6.34 8 8 0 0 0 6.34 17.66zM13.41 12l1.42 1.41a1 1 0 1 1-1.42 1.42L12 13.4l-1.41 1.42a1 1 0 1 1-1.42-1.42L10.6 12l-1.42-1.41a1 1 0 1 1 1.42-1.42L12 10.6l1.41-1.42a1 1 0 1 1 1.42 1.42L13.4 12z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="check-circle" role="presentation" class="fill-current text-success"><path fill="green" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"></path></svg>
            </div>
            <div class="score">
              <span>Online-Quiz</span>
              <svg v-if="!memberCourse.is_valid" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="x-circle" role="presentation" class="fill-current text-danger"><path fill="red" d="M4.93 19.07A10 10 0 1 1 19.07 4.93 10 10 0 0 1 4.93 19.07zm1.41-1.41A8 8 0 1 0 17.66 6.34 8 8 0 0 0 6.34 17.66zM13.41 12l1.42 1.41a1 1 0 1 1-1.42 1.42L12 13.4l-1.41 1.42a1 1 0 1 1-1.42-1.42L10.6 12l-1.42-1.41a1 1 0 1 1 1.42-1.42L12 10.6l1.41-1.42a1 1 0 1 1 1.42 1.42L13.4 12z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="check-circle" role="presentation" class="fill-current text-success"><path fill="green" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"></path></svg>
            </div>
          </div>
        </div>
        <div class="col">
          <div v-if="!memberCourse">
            <button class="" @click="startCourse">Kurs starten</button>
          </div>
          <div v-if="!memberCourse.is_valid">
            <button class="button" @click="takeQuiz">Quiz starten</button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>gestartet am: {{createdDate}}</span>
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
  .button {
    cursor: pointer;
    font-weight: bold;
    padding: 10px;
    border: none;
    outline: none;
    color: #FFF;
    background-color: #ff6f00;
  }
  .body {
    padding: 10px 0;
    .content {
      display: flex;
      .col {
        &.first {
          flex: 1;
        }
      }
      .scoretable {
        display: flex;
          .score {
            flex: 1;
            span {
              color: #000;
              font-size: 24px;
              margin-right: 20px;
            }
            svg {
            }
          }
      }
    }
  }
  .footer {
    font-size: 0.8em;
    padding: 5px 0;
    color: #333;
  }
}
</style>
