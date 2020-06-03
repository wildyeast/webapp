<template>
  <section class="course-slug">
    <div v-if="quiz && !done">
      <h2>{{quiz.name}}</h2>
      <code v-if="activeQuestion < quiz.quiz_questions.length">{{activeQuestion+1}} / {{quiz.quiz_questions.length}}</code>
      <a :href="quiz.slides_url" target="_blank">zu den Folien</a>
      <p>{{quiz.description}}</p>
      <div>
        <div class="question" v-for="(q, i) in quiz.quiz_questions" v-if="i === activeQuestion">
          <div class="question-header">
            <img :src="q.imagePath" alt=""/>
            <div class="title">
              <h3>{{q.title}}</h3>
              <p>{{q.description}}</p>
            </div>
          </div>
          <div class="answers">
            <div class="answer">
              <input type="checkbox" v-model="c1" name="" id="choice1"/>
              <label for="choice1">
                <img :src="q.choice1ImagePath" alt=""/>
                <div>{{q.choice_1_text}}</div>
              </label>
            </div>
            <div class="answer">
              <input type="checkbox" v-model="c2" name="" id="choice2"/>
              <label for="choice2">
                <img :src="q.choice2ImagePath" alt=""/>
                <div>{{q.choice_2_text}}</div>
              </label>
            </div>
            <div class="answer">
              <input type="checkbox" v-model="c3" name="" id="choice3"/>
              <label for="choice3">
                <img :src="q.choice3ImagePath" alt=""/>
                <div>{{q.choice_3_text}}</div>
              </label>
            </div>
            <div class="answer">
              <input type="checkbox" v-model="c4" name="" id="choice4"/>
              <label for="choice4">
                <img :src="q.choice4ImagePath" alt=""/>
                <div>{{q.choice_4_text}}</div>
              </label>
            </div>
          </div>
          <button @click="saveAnswer(q.id)" class="button">weiter</button>
        </div>
        <div v-if="activeQuestion >= quiz.quiz_questions.length">
          Last Step
          <button @click="saveQuiz()" class="button">Antworten senden</button>
        </div>
      </div>
    </div>
    <div v-if="done">
      <div v-if="score">
        Gratuliere! Du hast den test bestanden!
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
      window.scrollTo(0,0);
    },
    saveQuiz() {
      let data = {
        member_course_id: this.memberCourse.id,
        answers: this.answers
      };
      this.$store.dispatch("saveQuiz", data).then((result) => {
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
  .button {
    cursor: pointer;
    font-weight: bold;
    padding: 10px;
    border: none;
    outline: none;
    color: #FFF;
    background-color: #ff6f00;
  }
  @include margin-page-wide();
  .question {
    .question-header {
      display: flex;
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
      }
    }
  }
}

</style>
