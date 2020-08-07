<template>
  <section class="course-slug">
    <div v-if="quiz && !done" class="container">
      <h2 class="name">{{quiz.name}}</h2>
      <div class="separator"></div>
      <p class="directions">Lies dir zuerst die Folien durch und beantworte dann die Fragen:</p>
      <a :href="quiz.slides_url" target="_blank">zu den Folien <img class="slides" src="~/assets/img/icons/arrow-right-solid.svg"></a>
      <p>{{quiz.description}}</p>
      <div>
        <div class="question" v-for="(q, i) in quiz.quiz_questions" v-if="i === activeQuestion">
          <div class="question-header">
            <img :src="q.imagePath" alt=""/>
            <div class="title">
              <h3>{{q.title}}</h3>
              <p v-if="q.description != '_'">{{q.description}}</p>
            </div>
          </div>
          <div class="answers">
            <div class="answer">
              <input type="checkbox" v-model="c1" name="" id="choice1"/>
              <label for="choice1">
                <img :src="q.choice1ImagePath" alt=""/>
                <div class="answer-text">{{q.choice_1_text}}</div>
              </label>
            </div>
            <div class="answer">
              <input type="checkbox" v-model="c2" name="" id="choice2"/>
              <label for="choice2">
                <img :src="q.choice2ImagePath" alt=""/>
                <div class="answer-text">{{q.choice_2_text}}</div>
              </label>
            </div>
            <div class="answer">
              <input type="checkbox" v-model="c3" name="" id="choice3"/>
              <label for="choice3">
                <img :src="q.choice3ImagePath" alt=""/>
                <div class="answer-text">{{q.choice_3_text}}</div>
              </label>
            </div>
            <div class="answer">
              <input type="checkbox" v-model="c4" name="" id="choice4"/>
              <label for="choice4">
                <img :src="q.choice4ImagePath" alt=""/>
                <div class="answer-text">{{q.choice_4_text}}</div>
              </label>
            </div>
          </div>
          <button @click="saveAnswer(q.id)" class="weiter"><span>weiter </span><img class="arrow" src="~/assets/img/icons/arrow-right-solid.svg"></button>
        </div>
        <div v-if="activeQuestion >= quiz.quiz_questions.length">
          Well done! Alle Fragen beantwortet.
          <p></p>
          <button @click="saveQuiz()" class="">Antworten absenden</button>
        </div>
      </div>
    </div>
    <div v-if="done">
      <div v-if="score == 1">
        <p>Gratuliere! Du hast den Test bestanden! <img src="~/assets/img/icons/check-solid.svg" class="done"></p>
        <p>Als nächstes musst du nur noch den Kurs von einem Host oder am Frontdesk freischalten lassen.</p>
        <nuxt-link to="/me/trainings">Zurück</nuxt-link>
      </div>
      <div v-else>
        Oje, das hat leider nicht geklappt. Bitte lese dir nochmal die Unterlagen durch.
        <a :href="quiz.slides_url" target="_blank">zu den Folien</a>
        <br>
        <nuxt-link to="/me/trainings">Zurück</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return {
      done: false,
      id: null,
      quiz: null,
      activeQuestion: 0,
      answers: {},
      c1: false,
      c2: false,
      c3: false,
      c4: false,
      score: null
    }
  },
  mixins: [storyblokLivePreview],
  middleware: 'authenticated',
  created() {
    console.log(this.quiz);
  },
  methods: {
    saveAnswer(ans) {
      let choices = [this.c1, this.c2, this.c3, this.c4];
      let parsedChoices = [];
      for (let i in choices) {
        if (choices[i]) {
          parsedChoices.push(Number(i)+1);
        }
      }
      this.answers[ans] = parsedChoices;

      this.c1 = this.c2 = this.c3 = this.c4 = false;
      this.activeQuestion++;
    },
    saveQuiz() {
      let data = {
        member_course_id: this.memberCourse.id,
        answers: this.answers
      };
      this.$store.dispatch("saveQuiz", data).then((result) => {
        console.log("result ");
        console.log(result);
        this.done = true;
        this.score = result.score;

        this.$store.dispatch("getMemberCourses");
      });
    }
  },
  async asyncData(context) {
    let courseId = context.params.slug;
    let quiz = await context.store.dispatch('getQuiz', courseId);
    return { id: courseId, quiz };
  },
  computed: {
    memberCourse() {
      return this.$store.getters.getMemberCourseById(Number(this.id));
    }
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.course-slug {
  margin-top: 80px;
  @include margin-page-wide();
  .container {
    display: flex;
    flex-direction: column;
  }
  .name {
    align-self: center;
    background-color: $color-blue;
    color: #fff;
    margin: 0;
    padding: 5px 10px;
    text-align: center;
    white-space: nowrap;
    width: 25%;
    @include media-breakpoint-down(sm) {
      width: 75%;
    }
  }
  .separator {
    border-bottom: 2px dashed #0050ff;
    width: 100%;
    margin-top: -1em;
    z-index: -1;
  }
  .directions {
    margin-top: 40px;
  }
  .slides {
    height: 1%;
    width: 1%;
  }
  .question {
    .question-header {
      display: flex;
      @include media-breakpoint-down(sm) {
        display: block;
      }
      img {
        max-height: 20vh;
        flex: 1;
      }
      .title {
        flex: 3;
        padding: 0 4vw;
      }
    }
    .answers {
      display: flex;
      justify-content: space-evenly;
      @include media-breakpoint-down(sm) {
        flex-direction: column;
      }
      .answer {
        display: flex;
        padding: 4vh 0;
        align-items: center;
        input[type="checkbox"] {
          margin: 2vw;
          transform: scale(2);
          padding: 10px;
        }
        label {
          flex: 1;
          img {
            max-height: 20vh;
          }
          p {
            display: block;
          }
        }
        .answer-text {
          @include media-breakpoint-down(sm) {
            padding: 10px;
          }
        }
      }
    }
    .arrow {
      @include media-breakpoint-down(sm) {
        display: none;
      }
    }
  }
  .weiter {
    @include media-breakpoint-up(sm) {
      display: flex;
      height: 4%;
      margin-right: 12%;
      position: absolute;
      right: 0;
      width: 4%;
    }
      span {
        height: 100%;
        padding-top: 8px;
      }
      img {
        height: 50%;
        margin-top: 8px;
        width: 50%;
      }
  }
  .done {
    height: 1%;
    width: 1%;
  }
}

</style>
