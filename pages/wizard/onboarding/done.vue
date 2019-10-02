<template>
  <div class="section">
    <h2>FIN</h2>

    <no-ssr>

      <div v-if="loading">
        Loading...
      </div>
      <form class="form" name="signup" @submit.prevent="handleSubmit" v-else data-netlify="true" netlify-honeypot="bot-field">
        <label class="hidden"><input name="bot-field" /></label>
        <div data-netlify-recaptcha="true"></div>
        <label class="form-item">
          <span class="label">Test</span>
          <div class="body">
            <input class="input-text" type="name" name="name" v-model="form.name" placeholder="Dein Name">
          </div>
        </label>
        <div class="button-row">
          <button type="submit" class="input-button-primary">Abschicken</button>
        </div>
      </form>

    </no-ssr>

  </div>
</template>

<script>
import axios from "axios";

export default {
  middleware: 'authenticated',
  data () {
    return {
      loading: false,
      sent: false
    }
  },
  created() {
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
          "form-name": "signup",
          ...this.form
        }),
        axiosConfig
      ).then(() => {
        this.loading = false;
        this.sent = true;
      }).catch(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    form() {
      return {
        ...this.user.profile,
      }
    },
    user() {
      return this.$store.state.user;
    },
  }
}
</script>

<style lang="scss" scoped>
.form {
  .hidden {
    display: none;
  }
}
</style>
