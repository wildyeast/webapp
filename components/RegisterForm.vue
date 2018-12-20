<template>
  <div class="register-form">
    <div v-if="loading">
      loading…
    </div>
    <div v-else>
      <div class="header-item">
        <div class="headline">Werde GRAND GARAGE Mitglied</div>
        <div class="subtitle" @click="login">
          Bereits Mitglied? Zum Login.
        </div>
        <div class="info">
          Werde Teil einer lebendigen Community aus Kreativen, Makern und Start-ups!
          Ob Professional oder Starter – such' dir ganz einfach die für dich passende Mitgliedschaft aus und erhalte Zugang zur GRAND GARAGE.
        </div>
      </div>
      <div class="form-item">
        <span class="label">Vorname</span>
        <input type="text" v-model="firstName" placeholder="Vorname" @input="checkName" />
      </div>
      <div class="form-item">
        <span class="label">Nachname</span>
        <input type="text" v-model="lastName" placeholder="Nachname" @input="checkName" />
      </div>
      <div class="form-item">
        <span class="label">E-Mail</span>
        <input type="text" v-model="email" ref="email" placeholder="deine e-mail adresse" @input="checkMail" />
      </div>
      <div class="form-item">
        <span class="label">Passwort</span>
        <input type="password" v-model="password" placeholder="" @input="checkPassword" />
      </div>
      <div v-if="showPasswordError" class="form-item password-status">
        <span class="bad" v-if="!passwordValid">Passwörter stimmen nicht überein</span>
      </div>
      <div class="form-item">
        <span class="label">Passwort (wiederholen)</span>
        <input type="password" v-model="passwordRepeat" placeholder="" />
      </div>
      <div class="checkbox-item">
        <div class="checkbox-wrapper">
          <input type="checkbox" id="agb" v-model="agb" />
        </div>
        <label for="agb">AGB</label>
      </div>
      <div class="checkbox-item">
        <div class="checkbox-wrapper">
          <input type="checkbox" id="dsg" v-model="dsg" />
        </div>
        <label for="dsg">Datenschutzbestimmungen</label>
      </div>
      <div class="checkbox-item">
        <div class="checkbox-wrapper">
          <input type="checkbox" id="newsletter" v-model="newsletter" />
        </div>
        <label for="newsletter">Newsletter</label>
      </div>
      <div class="form-item error-message" v-if="errorMessage">
        <span>{{errorMessage}}</span>
      </div>
      <div class="form-item">
        <button :disabled="!formValid" @click="submit">Registrieren</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import validator from 'validator';

export default {
  props: ['blok'],
  data() {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      firstName: '',
      lastName: '',
      agb: false,
      dsg: false,
      newsletter: false,
      errorMessage: null,
      loading: false,
    }
  },
  computed: {
    passwordValid() {
      return this.password === this.passwordRepeat;
    },
    emailValid() {
      return validator.isEmail(this.email);
    },
    formValid() {
      return this.passwordValid && this.emailValid && this.agb && this.dsg;
    },
    showEmailError() {
      return this.email !== '';
    },
    showPasswordError() {
      return this.password !== '';
    }
  },
  methods: {
    submit() {
      this.loading = true;
      let data = {
        email: this.email,
        password: this.password,
        user_metadata: {
          firstName: this.firstName,
          lastName: this.lastName,
        }
      }
      this.$store.dispatch('registerUser', data).then((r) => {
        this.loading = false;
        this.$store.dispatch('setSidebar', 'register-success');
      }).catch((e) => {
        this.loading = false;
        if (e.error) {
          this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.error + '"';
          return;
        }
        if (e.code) {
          switch (e.code) {
            case 'user_exists':
              this.errorMessage = 'Der User Existiert bereits';
              break;
            case 'invalid_password':
              this.errorMessage = 'Das Passwort ist zu schwach.';
              // not displaying policy, but printing to console
              console.log(e.policy);
              break;
            default:
              this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.code + '"';
              break;
          }
        }
      });
    },
    login() {
      this.$store.dispatch('setSidebar', 'login');
    },
    clearError() {
      this.errorMessage = null;
    },
    checkName() {
      this.clearError();
    },
    checkMail() {
      this.clearError();
    },
    checkPassword() {
      this.clearError();
    },
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.register-form {
  margin: 0 -10px;
  padding: 50px;
  background-color: $color-bright-bg;
  .header-item {
    margin-bottom: 40px;
    .headline {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 15px;
      font-family: $font-secondary;
    }
    .info {
      margin: 20px 0;
      font-size: 0.9em;
    }
    .subtitle {
      font-size: 0.9rem;
      color: $color-orange;
      font-family: $font-mono;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .form-item {
    padding: 10px;
    display: flex;
    .label {
      flex: 1;
      max-width: 200px;
      font-weight: bold;
    }
    input {
      outline: none;
      flex: 4;
      padding: 5px 10px;
      border: 1px solid #ccc;
      &:focus {
        border-color: $color-orange;
      }
    }
    button {
      background-color: $color-orange;
      color: #FFF;
      border: 1px solid lighten($color-orange, 10);
      padding: 5px 10px;
      outline: none;
      &:focus {
        background-color: lighten($color-orange, 10);
      }
      &:disabled {
        background-color: #AAA;
        border-color: #999;
        cursor: not-allowed;
      }
    }
  }
  .checkbox-item {
    padding: 10px;
    display: flex;
    .checkbox-wrapper {
      padding-right: 20px;
      outline: none;
      text-align: right;
      user-select: none;
      flex: 1;
      max-width: 180px;
    }
    label {
      user-select: none;
    }
  }
  .disclaimer {
    color: #333;
    a {
      color: $color-orange;
      padding: 0 3px;
    }
  }
  .error-message {
    color: red;
  }
}
</style>
