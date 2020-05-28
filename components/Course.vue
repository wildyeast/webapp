<template>
  <div class="training-item" v-if="course">
    <div class="body">
      <div class="content">
        {{course.name}}
      </div>
      <div v-if="!memberCourse">
        <button class="" @click="startCourse">Kurs starten</button>
      </div>
      <div v-else>
        <span>gestartet am: {{createdDate}}</span>
        <span>Praxistest: {{!!memberCourse.manual_activation}}</span>
        <span>Online-Quiz: {{!!memberCourse.is_valid}}</span>
        <div v-if="!memberCourse.is_valid">
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
    .content {
      flex: 1;
    }
  }
  .footer {
    font-size: 0.8em;
    padding: 5px 0;
    color: #333;
  }
}
</style>
