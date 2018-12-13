<template>
  <div class="register-form">
    <div class="title">
      Neuen Account registrieren
    </div>
    <div v-if="loading">
      sending
    </div>
    <div v-else>
      <div class="form-item">
        <span class="label">Vorname</span>
        <input type="text" v-model="firstName" placeholder="Vorname" />
      </div>
      <div class="form-item">
        <span class="label">Nachname</span>
        <input type="text" v-model="lastName" placeholder="Nachname" />
      </div>
      <!--
      <div v-if="showEmailError" class="form-item username-status">
        <span class="good" v-if="emailValid">schaut gut aus</span>
        <span class="bad" v-else>keine gültige email</span>
      </div>
      -->
      <div class="form-item">
        <span class="label">E-Mail</span>
        <input type="text" v-model="email" ref="email" placeholder="deine e-mail adresse" @input="checkMail" />
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
      firstName: '',
      lastName: '',
      email: '',
      agb: false,
      dsg: false,
      newsletter: false,
      errorMessage: null,
      waitForMail: false,
      loading: false
    }
  },
  computed: {
    usernameValid() {
      return this.username &&
        this.username.length >= 3;
    },
    nameValid() {
      return this.firstName && this.lastName;
    },
    emailValid() {
      return validator.isEmail(this.email);
    },
    formValid() {
      return this.nameValid && this.emailValid;
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
      }
      this.$store.dispatch('createMember', data).then((r) => {
        this.loading = false;
        if (r.status === 'error') {
          if (r.msg === 'INVALID_EMAIL') {
            this.errorMessage = 'Keine gültige Email';
          }
        } else {
          this.waitForMail = true;
        }
      }).catch((e) => {
        console.log("error");
      });
    },
    clearMail() {
      this.errorMessage = null;
    },
    clearUsername() {
      this.usernameTaken = null;
      this.errorMessage = null;
    },
    checkMail() {
      this.clearMail();
      //let valid = validator.isEmail(this.email);
    },
    doCheckUsername() {
      this.usernameTaken = null;
      if (!this.usernameValid) {
        return;
      }
      let name = this.username;
      this.$store.dispatch('checkUsername', { name }).then((r) => {
        this.checkedUsername = name;
        this.usernameTaken = !r;
      }).catch((e) => {
        console.log(e);
      });
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.register-form {
  margin: 0 -10px;
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
      cursor: pointer;
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
  .username-status {
    .good {
      color: green;
    }
    .bad {
      color: red;
    }
  }
  .error-message {
    color: red;
  }
}
</style>
