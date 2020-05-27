<template>
  <section class="">
    <code>hello {{id}}</code>
    <div>
      <code>{{quiz}}</code>
      <div v-for="q in quiz.quiz_questions">
        <div>
          {{q}}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return {
      id: null
    }
  },
  mixins: [storyblokLivePreview],
  middleware: 'authenticated',
  async asyncData(context) {
    let id = context.params.slug;
    let quiz = await context.store.dispatch('getQuiz', id);
    return { id, quiz };
  },
  computed: {
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
