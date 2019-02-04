<template>
  <div v-editable="blok" class="feedback-form">
    <div class="msg" v-if="loading">
      Loading...
    </div>
    <div class="msg" v-else-if="sent">
      Danke für dein Feedback!
    </div>

    <form class="form" name="feedback" @submit.prevent="handleSubmit" v-else data-netlify="true" netlify-honeypot="bot-field">
      <label class="hidden"><input name="bot-field" /></label>
      <div data-netlify-recaptcha="true"></div>
      <label class="form-item">
        <span class="label">Name</span>
        <div class="body" v-if="!user">
          <input class="input-text" type="name" name="name" v-model="form.name" placeholder="Dein Name">
        </div>
        <div class="body" v-else>
          <span>{{form.name}}</span>
        </div>
      </label>
      <label v-if="!user" class="form-item">
        <span class="label">E-Mail Adresse</span>
        <div class="body">
          <input class="input-text" type="email" name="email" v-model="form.email" placeholder="Deine E-Mail Adresse">
        </div>
      </label>
      <label class="form-item">
        <span class="label">Nachricht</span>
        <div class="body">
          <textarea class="input-textarea" v-model="form.msg" name="msg"></textarea>
        </div>
      </label>
      <div class="button-row">
        <button type="submit" class="input-button-primary">Abschicken</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['blok'],
  data() {
    return {
      loading: false,
      sent: false,
      form: {
        name: '',
        email: '',
        msg: '',
      }
    }
  },
  created() {
    if (this.user) {
      this.form.name = this.user.profile.firstName + ' ' + this.user.profile.lastName;
      this.form.email = this.user.profile.emailAddress;
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit () {
      this.loading = true;
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      axios.post(
        "/",
        this.encode({
          "form-name": "feedback",
          ...this.form
        }),
        axiosConfig
      ).then(() => {
        this.loading = false;
        this.subscribed = true;
      }).catch(() => {
        this.loading = false;
      });
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.feedback-form {
  max-width: 640px;
  margin: auto;
  .hidden {
    display: none;
  }
}
</style>
