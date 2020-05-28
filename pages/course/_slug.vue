<template>
  <section class="" v-if="quiz">
    <h2>{{quiz.name}}</h2>
    <p>{{quiz.description}}</p>
    <a :href="quiz.slides_url" target="_blank">zu den Folien</a>
    <div>
      <div class="question" v-for="(q, i) in quiz.quiz_questions" v-if="i === activeQuestion">
        <div class="question">
          <h3>{{q.title}}</h3>
          <p>{{q.description}}</p>
          <div class="answers">
            <div class="answer">
              <img :src="q.choice_1_image" alt=""/>
              <input type="checkbox" v-model="c1" name="" id="choice1"/>
              <label for="choice1">{{q.choice_1_text}}</label>
            </div>
            <div class="answer">
              <img :src="q.choice_2_image" alt=""/>
              <input type="checkbox" v-model="c2" name="" id="choice2"/>
              <label for="choice2">{{q.choice_2_text}}</label>
            </div>
            <div class="answer">
              <img :src="q.choice_3_image" alt=""/>
              <input type="checkbox" v-model="c3" name="" id="choice3"/>
              <label for="choice3">{{q.choice_3_text}}</label>
            </div>
            <div class="answer">
              <img :src="q.choice_4_image" alt=""/>
              <input type="checkbox" v-model="c4" name="" id="choice4"/>
              <label for="choice4">{{q.choice_4_text}}</label>
            </div>
          </div>
        </div>
        <button @click="saveAnswer(i)" class="">weiter</button>
      </div>
      <div v-if="activeQuestion >= quiz.quiz_questions.length">
        Well done!
        <button @click="saveQuiz()" class="">Antworten senden</button>
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return {
      id: null,
      quiz: null,
      activeQuestion: 0,
      answers: {},
      c1: false,
      c2: false,
      c3: false,
      c4: false,
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
    },
    saveQuiz() {
      /*
      console.log(this.id);
      let mcs = this.$store.state.memberCourses;
      console.log(mcs);
      let d = mcs.find(c => c.course_id === this.id);
      console.log(d);
      //let mc = this.$store.state.getMemberCourseById(this.id);
      console.log(mc);
      */
      console.log(this.memberCourse);
      let data = {
        member_course_id: this.memberCourse.id,
        answers
      };
      this.$store.dispatch("saveQuiz", data);
    }
  },
  async asyncData(context) {
    let courseId = context.params.slug;
    //let memberCourse = context.getters.getMemberCourseById(this.id);
    let quiz = await context.store.dispatch('getQuiz', courseId);
    return { id: courseId, quiz };
  },
  computed: {
    memberCourse() {
      return this.$store.getters.getMemberCourseById(this.id);
    }
  }
}
</script>


<style lang="scss" scoped>
.workshop {
  .info {
    display: flex;
    justify-content: center;
    padding: 20px 100px;
    .markdown {
    }
  }
}
</style>
