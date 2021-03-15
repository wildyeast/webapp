<template>
  <section class="course-slug">
    <div v-if="quiz && !done" class="container">
      <h2 class="name">{{quiz.name}}</h2>
      <div class="separator"></div>
      <div class="overview" v-if="overview">
        <div class="">
        <p class="directions">Lies dir zuerst die Folien durch und beantworte dann die Fragen:</p>
          <p v-if="quiz.description">{{quiz.description}}</p>
          <p class="directions" v-if="!quiz.slides_url.includes('slides')"><a :href="quiz.slides_url" target="_blank"  @click="showSlides">zu den Folien</a></p>
        </div>
        <div class="course-slides">
          <iframe v-if="" :src="quiz.slides_url" width="800" height="600" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
      </div>
      <div class="quiz">
        <div class="question" v-for="(q, i) in quiz.quiz_questions" v-if="i === activeQuestion && !overview">
          <div class="question-header">
            <img v-if="q.imagePath != 'https://connector.grandgarage.eu/storage/'" :src="q.imagePath" alt=""/>
            <div class="title">
              <h3>{{q.title}}</h3>
              <p class="quiz-description" v-if="q.description != '_'">{{q.description}}</p>
            </div>
          </div>
          <div class="answers">
            <div class="answer">
              <input type="checkbox" v-model="c1" name="" id="choice1"/>
              <label for="choice1">
                <img v-if="q.choice1ImagePath != undefined " :src="q.choice1ImagePath" alt=""/>
                <div class="answer-text">{{q.choice_1_text}}</div>
              </label>
            </div>
            <div class="answer">
              <input type="checkbox" v-model="c2" name="" id="choice2"/>
              <label for="choice2">
                <img v-if="q.choice2ImagePath != undefined " :src="q.choice2ImagePath" alt=""/>
                <div class="answer-text">{{q.choice_2_text}}</div>
              </label>
            </div>
            <div class="answer">
              <input type="checkbox" v-model="c3" name="" id="choice3"/>
              <label for="choice3">
                <img v-if="q.choice3ImagePath != undefined " :src="q.choice3ImagePath" alt=""/>
                <div class="answer-text">{{q.choice_3_text}}</div>
              </label>
            </div>
            <div class="answer">
              <input type="checkbox" v-model="c4" name="" id="choice4"/>
              <label for="choice4">
                <img v-if="q.choice4ImagePath != undefined " :src="q.choice4ImagePath" alt=""/>
                <div class="answer-text">{{q.choice_4_text}}</div>
              </label>
            </div>
          </div>
          <button @click="saveAnswer(q.id)" class="weiter"><span>weiter </span></button>
        </div>
        <button @click="startQuiz" class="input-button-primary" v-if="overview">Los geht's</button>
        <div v-if="activeQuestion >= quiz.quiz_questions.length" class="quizDone">
          Well done! Alle Fragen beantwortet.
          <p></p>
          <button @click="saveQuiz()" class="input-button-primary">Antworten absenden</button>
        </div>
      </div>
    </div>
    <div v-if="done" class="wellDone">
      <h2 class="name">{{quiz.name}}</h2>
      <div class="separator"></div>
      <div class="result" v-if="score == 1">
        <p>Gratuliere! Du hast den Test bestanden! <img src="~/assets/img/icons/check-solid.svg" class="done"></p>
        <p>Als nächstes musst du nur noch den Kurs von einem Host oder am Frontdesk freischalten lassen.</p>
        <nuxt-link to="/me/trainings">Zurück</nuxt-link>
      </div>
      <div class="result" v-else>
        Oje, das hat leider nicht geklappt. Bitte lese dir nochmal die Unterlagen durch.
        <a :href="quiz.slides_url" target="_blank">zu den Folien</a>
        <br>
        <nuxt-link to="/me/trainings">Zurück</nuxt-link>
      </div>
    </div>

    <div class="reveal">
      <div class="slides">
        <section data-background-iframe="https://slides.com/arwe/template-asu/embed" height="420"
                 data-background-interactive
                 data-background-size="cover"></section>
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
// import Reveal from 'reveal.js';
// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

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
      score: null,
      overview: true,
      big: true,
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
      window.scrollTo(0, 0);
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
    },
    startQuiz() {
      this.overview = false;
    },
    showSlides(){
      if(this.quiz.slides_url.includes('slides')){
        // let deck = new Reveal( {
        //   plugins: [ Markdown ]
        // })
        // deck.initialize();
      }
    },
  },
  async asyncData(context) {
    let courseId = context.params.slug;
    let quiz = await context.store.dispatch('getQuiz', courseId);
    return { id: courseId, quiz };
  },
  computed: {
    memberCourse() {
      // return this.$store.getters.getMemberCourseById(Number(this.id));
    }
  },
  mounted() {
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
//@import "node_modules/reveal.js/dist/reveal.css";


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
/*  .slides {
    height: 1%;
    width: 1%;
  }*/
  .question {
    display: flex;
    flex-direction: column;
    .question-header {
      align-items: center;
      display: flex;
      margin-bottom: 20px;
      flex-direction: column-reverse;
      @include media-breakpoint-down(sm) {
        margin-top: 0px;
        flex-direction: column-reverse;
        align-items: center;
      }
      img {
        max-height: 20vh;
        flex: 1;
      }
      .title {
        flex: 3;
        padding: 0 4vw;
        @include media-breakpoint-down(sm) {
          text-align: center;
        }
      }
    }
    .answers {
      display: flex;
      justify-content: space-evenly;
      @include media-breakpoint-down(lg) {
        flex-direction: column;
      }
      @include media-breakpoint-up(sm) {
        align-items: center;
      }
      .answer {
        background-color: #FFFFFF;
        border: 1px solid #FFFFFF;
        border-radius: 5%;
        display: flex;
        padding: 25px;
        margin: 10px;
        align-items: center;
        @include media-breakpoint-up(sm) {
          width: 50%;
        }
        input[type="checkbox"] {

          padding-right: 70%;
        }
        label {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: auto;
          margin-right: auto;
          img {
            box-shadow: 5px 3px 5px #d3d3d3;
            margin-bottom: 25px;
            max-height: 20vh;
            width: 50%;
          }
          p {
            display: block;
          }
        }
        .answer-text {
          text-align: center;
          padding: 10px 20px 10px 20px;
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
    margin-top: 20px;
    padding: 10px;
    cursor: pointer;
    background-color: #ff6f00;
    color: #FFF;
    border: 1px solid #ff8c33;
    padding: 7px 12px 8px;
    line-height: 1;
    outline: none;
    width: 5%;
    align-self: center;
    @include media-breakpoint-down(lg) {
      width: 20%;
    }
  }
  .done {
    height: 1%;
    width: 1%;
  }
}
  .quiz {
    @include media-breakpoint-down(sm) {
      margin-top: 50px;
    }
  }

  .quizDone {
    margin-top: 40px;
    @include media-breakpoint-down(sm) {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .wellDone {
    flex-direction: column;
    display: flex;
    @include media-breakpoint-down(sm) {
      padding: 20px;
    }
    .result {
      margin-top: 20px;
    }
  }

  .reveal{
    height: 20vh;
    @include media-breakpoint-down(sm) {
      height: 80vh;
    }
  }
  .slide-background .present {
    height: 100%;
  }
  .slide-background-content {
    height: 100%;
  }

  .big {
    height: 100%;
  }

  .course-slides {
    display: flex;
    justify-content: center;
    iframe {
      height: 450px;
    }
  }

  .course-info {
    @include media-breakpoint-up(sm) {
      display: flex;
      justify-content: space-between;
    }
    margin: 0 10px;
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
    @include media-breakpoint-down(sm) {
      float: right;
    }
  }
  .quiz-description {
    text-align: center;
    margin-bottom: 20px;
  }
</style>
