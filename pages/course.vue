<template>
  <section class="course-slug">
    <div
      v-if="!quiz"
      style="width: 100%; text-align: center; font-size: 2em;"
    >
      <loading-spinner />
    </div>
    <div
      v-if="quiz && !done"
      class="container"
    >
      <h2 class="name">
        {{ quiz.name }}
      </h2>
      <div class="separator" />
      <div
        v-if="overview"
        class="overview"
      >
        <div class="">
          <p class="directions">
            Lies dir zuerst {{ quiz.slides_url ? 'die Folien' : 'das Dokument' }} durch und beantworte dann die Fragen:
          </p>
          <p v-if="quiz.description">
            {{ quiz.description }}
          </p>
        </div>
        <div
          v-if="quiz.slides_url"
          class="course-slides"
        >
          <!--          <p class="directions" v-if="!quiz.slides_url.includes('slides')"><a :href="quiz.slides_url" target="_blank"  @click="showSlides">zu den Folien</a></p>-->
          <iframe
            v-if=""
            :src="quiz.slides_url"
            width="800"
            height="600"
            scrolling="no"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
          />
        </div>
        <div
          v-if="quiz.slides_url && quiz.pdf"
          style="height: 2em;"
        />
        <div
          v-if="quiz.pdf"
          class="course-pdf"
        >
          <font-awesome-icon icon="file-pdf" />
          <a :href="pdfUrl">
            PDF mit Kursunterlagen</a>
        </div>
      </div>
      <div class="quiz">
        <div
          v-for="(q, i) in quiz.quiz_questions"
          v-if="i === activeQuestion && !overview"
          class="question"
        >
          <div class="question-header">
            <img
              v-if="q.imagePath != 'https://connector.grandgarage.eu/storage/'"
              :src="q.imagePath"
              alt=""
            >
            <div class="title">
              <h3>{{ q.title }}</h3>
              <p
                v-if="q.description != '_'"
                class="quiz-description"
              >
                {{ q.description }}
              </p>
            </div>
          </div>
          <div class="answers">
            <div
              class="answer"
              @click="c1 = !c1"
            >
              <input
                id="choice1"
                v-model="c1"
                type="checkbox"
                name=""
              >
              <label for="choice1">
                <img
                  v-if="q.choice1ImagePath "
                  class="image"
                  :src="q.choice1ImagePath"
                  :alt="`Bild für Antwort ${1}`"
                >
                <div class="answer-text">{{ q.choice_1_text }}</div>
              </label>
            </div>
            <div
              class="answer"
              @click="c2 = !c2"
            >
              <input
                id="choice2"
                v-model="c2"
                type="checkbox"
                name=""
              >
              <label>
                <img
                  v-if="q.choice2ImagePath"
                  class="image"
                  :src="q.choice2ImagePath"
                  :alt="`Bild für Antwort ${2}`"
                >
                <div class="answer-text">{{ q.choice_2_text }}</div>
              </label>
            </div>
            <div
              class="answer"
              @click="c3 = !c3"
            >
              <input
                id="choice3"
                v-model="c3"
                type="checkbox"
                name=""
              >
              <label for="choice3">
                <img
                  v-if="q.choice3ImagePath"
                  class="image"
                  :src="q.choice3ImagePath"
                  :alt="`Bild für Antwort ${3}`"
                >
                <div class="answer-text">{{ q.choice_3_text }}</div>
              </label>
            </div>
            <div
              class="answer"
              @click="c4 = !c4"
            >
              <input
                id="choice4"
                v-model="c4"
                type="checkbox"
                name=""
              >
              <label for="choice4">
                <img
                  v-if="q.choice4ImagePath"
                  class="image"
                  :src="q.choice4ImagePath"
                  :alt="`Bild für Antwort ${4}`"
                >
                <div class="answer-text">{{ q.choice_4_text }}</div>
              </label>
            </div>
          </div>
          <button
            class="weiter"
            @click="saveAnswer(q.id)"
          >
            <span>weiter </span>
          </button>
        </div>
        <button
          v-if="overview"
          class="input-button-primary"
          @click="startQuiz"
        >
          Los geht's
        </button>
        <div
          v-if="activeQuestion >= quiz.quiz_questions.length"
          class="quizDone"
        >
          Du hast alle Fragen beantwortet!
          <p />
          <button
            class="input-button-primary"
            @click="saveQuiz"
          >
            Antworten absenden
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="done"
      class="wellDone"
    >
      <h2 class="name">
        {{ quiz.name }}
      </h2>
      <div class="separator" />
      <div
        v-if="score == 1"
        class="result"
      >
        <p>Gratuliere! Du hast den Test bestanden!</p>
        <p>Als nächstes musst du nur noch den Kurs von einem Host oder am Frontdesk freischalten lassen.</p>
        <button
          class="input-button-primary"
          @click="$router.push('/me/trainings')"
        >
          Zurück
        </button>
      </div>
      <div
        v-else-if="code"
        class="result"
      >
        <p>Gratuliere! Du hast den Test bestanden!</p>
        <p>Dein Bestätigungscode lautet:</p>
        <p class="code">
          {{ code }}
        </p>
        <p>Mit diesem Code kannst du den Kurs von einem Host oder am Frontdesk freischalten lassen.</p>
        <button
          class="input-button-primary"
          @click="$router.push('/')"
        >
          Zurück zur Startseite
        </button>
      </div>
      <div
        v-else
        class="result"
      >
        Oje, das hat leider nicht geklappt. Bitte lies dir nochmal die Unterlagen durch.
        <button
          class="input-button-primary"
          @click="isPublic ? restartAsu() : $router.push('/me/trainings')"
        >
          Zurück
        </button>
      </div>
    </div>
    <div
      v-if="quiz && quiz.slides_url"
      class="reveal"
    >
      <div class="slides">
        <section
          data-background-iframe="https://slides.com/arwe/template-asu/embed"
          height="420"
          data-background-interactive
          data-background-size="cover"
        />
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
// import Reveal from 'reveal.js';
// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

export default {
  mixins: [storyblokLivePreview],
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
      isPublic: false,
      code: ''
    }
  },
  computed: {
    memberCourse () {
      return this.$store.getters.getMemberCourseById(this.id)
    },
    pdfUrl () {
      if (this.quiz && this.quiz.pdf) {
        return this.$store.getters.getStorageUrl + this.quiz.pdf
      }
    }
  },
  async mounted () {
    if (!this.$route.query || !this.$route.query.id) {
      this.id = 1
    } else {
      this.id = this.$route.query.id
    }
    if (this.$store.state.auth) {
      this.quiz = await this.$store.dispatch('getQuiz', this.id)
      return
    }
    if (parseInt(this.id) === 1) {
      this.isPublic = true
      this.quiz = await this.$store.dispatch('getAsu')
      return
    }
    return this.$router.push('/')
  },
  // middleware: 'authenticated',
  methods: {
    async restartAsu (id) {
      this.done = false
      this.id = null
      this.quiz = null
      this.activeQuestion = 0
      this.answers = {}
      this.c1 = false
      this.c2 = false
      this.c3 = false
      this.c4 = false
      this.score = null
      this.overview = true
      this.big = true
      this.isPublic = false
      this.code = ''
      this.id = 1
      this.quiz = await this.$store.dispatch('getAsu')
    },
    saveAnswer (ans) {
      const choices = [this.c1, this.c2, this.c3, this.c4]
      const parsedChoices = []
      for (const i in choices) {
        if (choices[i]) {
          parsedChoices.push(Number(i) + 1)
        }
      }
      this.answers[ans] = parsedChoices

      this.c1 = this.c2 = this.c3 = this.c4 = false
      this.activeQuestion++
      window.scrollTo(0, 0)
    },
    saveQuiz () {
      const data = {
        member_course_id: this.memberCourse ? this.memberCourse.id : null,
        answers: this.answers
      }
      const endpoint = this.isPublic ? 'savePublicQuiz' : 'saveQuiz'
      this.$store.dispatch(endpoint, data).then((result) => {
        this.done = true
        this.score = result.score
        if (this.isPublic) {
          this.code = result.code
          return
        }
        this.$store.dispatch('getMemberCourses')
      })
    },
    startQuiz () {
      this.overview = false
    },
    showSlides () {
      // if(this.quiz.slides_url.includes('slides')){
      // let deck = new Reveal( {
      //   plugins: [ Markdown ]
      // })
      // deck.initialize();
      // }
    }
    // async getPdf () {
    //   const res = await this.$store.dispatch('getCoursePDF', `/storage/${this.quiz.pdf}`)
    //   const blob = new Blob([res.data], { type: 'application/pdf' });
    //   const link = document.createElement('a')
    //   link.download = this.quiz.name + '.pdf'
    //   link.href = URL.createObjectURL(blob)
    //   link.click()
    // }
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
    margin: 4em;
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
        cursor: pointer;
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
  .weiter:hover {
    font-weight: bold;
  }
  .done {
    height: 1%;
    width: 1%;
  }
}
  .quiz {
    text-align: center;
    margin-top: 50px;
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
    aligin-items: center;
    justify-content: center;
    @include media-breakpoint-down(sm) {
      padding: 20px;
    }
    .result {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 4em;
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

  .course-pdf {
    color: $color-orange;
    & a {
      margin-left: 0.5em;
    }
    & a:hover {
      text-decoration: underline;
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
  .input-button-primary:hover {
    font-weight: bold;
  }
  .quiz-description {
    text-align: center;
    margin-bottom: 20px;
  }
  .overview {
    text-align: center;
  }
  label, .image {
    pointer-events: none;
  }
  .code {
    background: black;
    color: white;
    font-family: $font-mono;
    font-size: 1.4em;
    font-weight: bold;
    width: 10em;
    text-align: center;
    padding: 0.5em;
  }
</style>
