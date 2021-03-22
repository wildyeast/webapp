<template>
  <div class="section">
    <h2>Wie hast du von uns erfahren?</h2>
    <no-ssr>
      <form class="form" name="signup" @submit.prevent="handleSubmit" data-netlify="true" netlify-honeypot="bot-field">
        <label class="hidden"><input name="bot-field" /></label>
        <div data-netlify-recaptcha="true"></div>
        <textarea class="textarea" type="referrer" name="referrer" v-model="onboardingData.referrer" placeholder="" />
      </form>
    </no-ssr>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated',
  props: {
    onboardingData: {
      type: Object,
      required: true
    }
  },
}
</script>
<style lang="scss" scoped>
.textarea {
  width: 40em;
  height: 13em;
  margin-top: 1em;
}
.hidden {
  display: none;
}
</style>
