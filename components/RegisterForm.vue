<template>
  <div class="register-form">
    <div v-if="loading">
      <loading-spinner color="black"></loading-spinner>
    </div>
    <div v-else>
      <div class="header-item">
        <div class="space">
          <div class="headline">
            <div>
            <div class="back" @click="login">
              <font-awesome-icon icon="angle-left" />
            </div>
              <span class="text">Werde Teil einer lebendigen Community!</span>
            </div>
            <div class="close" @click="close">
              <font-awesome-icon icon="times" />
            </div>
          </div>
          <div class="info">
            Herzlich Willkommen auf deinen ersten Schritten in der GRAND GARAGE.
            Wir sind eine offene Werkstatt, ein Makerspace, ein FABLab und noch vieles mehr. Registriere dich jetzt und erhalte Zugang zur GRAND GARAGE und unseren Services.
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="label">Vorname</span>
        <input :class="{ red: this.invalidFields.includes('firstName')} "type="text" v-model="firstName" placeholder="Vorname" @input="checkName" />
      </div>
      <div class="form-item">
        <span class="label">Nachname</span>
        <input :class="{ red: this.invalidFields.includes('lastName')}" type="text" v-model="lastName" placeholder="Nachname" @input="checkName" />
      </div>
      <div class="form-item">
        <span class="label">E-Mail</span>
        <input :class="{ red: this.invalidFields.includes('email') }" type="email" v-model="email" ref="email" placeholder="deine e-mail adresse" @input="checkMail" />
      </div>
      <div class="form-item">
        <span class="label">Adresse</span>
        <input :class="{ red: this.invalidFields.includes('address') }" type="text" v-model="address" ref="address" placeholder="Straße und Hausnummer" @input="checkAddress" />
      </div>
      <div class="form-item">
        <span class="label">Stadt</span>
        <input :class="{ red: this.invalidFields.includes('city') }" type="text" v-model="city" ref="city" placeholder="Stadt" @input="checkCity" />
      </div>
      <div class="form-item">
        <span class="label">PLZ</span>
        <input :class="{ red: this.invalidFields.includes('zip') }" type="text" v-model="zip" ref="zip" placeholder="Postleitzahl" @input="checkZip" />
      </div>
      <div class="form-item">
        <span class="label">Passwort</span>
        <div class="password-wrapper">
          <input :class="{ red: this.invalidFields.includes('password') }" type="password" v-model="password" placeholder="" @input="checkPassword" />
          <div v-if="!passwordValid" class="form-item password-status">
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="label">Passwort (wiederholen)</span>
        <input type="password" v-model="passwordRepeat" placeholder="" />
        <div class="password-error">
          <span class="bad" v-if="!passwordValid">Passwörter stimmen nicht überein</span>
        </div>
      </div>
      <div class="checkbox-item">
        <div class="checkbox-wrapper">
          <input :class="{ red: this.invalidFields.includes('agb') }" type="checkbox" id="agb" v-model="agb" />
        </div>
        <label for="agb">Ich habe die <nuxt-link target="_blank" to="/de/agb">Teilnahmebedingungen / AGB</nuxt-link> gelesen und bin damit einverstanden.</label>
      </div>
      <div class="checkbox-item">
        <div class="checkbox-wrapper">
          <input :class="{ red: this.invalidFields.includes('dsg') }" type="checkbox" id="dsg" v-model="dsg" />
        </div>
        <label for="dsg">Ich habe die <nuxt-link target="_blank" to="/de/datenschutzerklaerung">Datenschutzerklärung</nuxt-link> gelesen und bin damit einverstanden.</label>
      </div>
      <!--
      <div class="checkbox-item">
        <div class="checkbox-wrapper">
          <input type="checkbox" id="newsletter" v-model="newsletter" />
        </div>
        <label for="newsletter">Ich bin damit einverstanden, Newsletter an meine angegebene E-Mail Adresse zu erhalten.</label>
      </div>
      -->
      <div class="form-item error-message" v-if="errorMessage">
        <span></span>
        <div>
          <span>{{errorMessage}}</span>
          <markdown class="policy" v-if="errorDescription" :value="errorDescription"></markdown>
        </div>
      </div>
      <div class="form-item button-row">
        <button @click="submit">Registrieren</button>
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
      address: '',
      city: '',
      zip: '',
      password: '',
      passwordRepeat: '',
      firstName: '',
      lastName: '',
      agb: false,
      dsg: false,
      newsletter: false,
      errorMessage: null,
      errorDescription: '',
      loading: false,
      emailInvalid: false,
      invalidFields: []
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
      return this.passwordValid && this.emailValid && this.agb && this.dsg && this.firstName && this.lastName && this.address && this.city && this.zip;
    },
    showEmailError() {
      return this.email !== '';
    },
    showPasswordError() {
      return this.password !== '';
    }
  },
  methods: {
    close() {
      this.$store.dispatch('setSidebar', null);
    },
    submit() {
      if (!this.formValid) {
        this.invalidFields.length = 0
        if (!this.emailValid) {
          this.invalidFields.push('email', true)
        }
        if (!this.firstName) {
          this.invalidFields.push('firstName', true)
        }
        if (!this.lastName) {
          this.invalidFields.push('lastName', true)
        }
        if (!this.address) {
          this.invalidFields.push('address', true)
        }
        if (!this.city) {
          this.invalidFields.push('city', true)
        }
        if (!this.zip) {
          this.invalidFields.push('zip', true)
        }
        if (!this.password) {
          this.invalidFields.push('password', true)
        }
        if (!this.agb) {
          this.invalidFields.push('agb', true)
        }
        if (!this.dsg) {
          this.invalidFields.push('dsg', true)
        }
        return
      }
      this.loading = true;
      let data = {
        email: this.email,
        password: this.password,
        user_metadata: {
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          city: this.city,
          zip: this.zip
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
              this.errorDescription = e.policy;
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
      this.errorDescription = '';
    },
    checkName() {
      this.clearError();
    },
    checkMail() {
      this.clearError();
    },
    checkAddress() {
      this.clearError();
    },
    checkCity() {
      this.clearError();
    },
    checkZip() {
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
.red {
  outline: 1px solid red !important;
}
.register-form {
  padding: 5vw;
  background-color: $color-bright-bg;
  .header-item {
    display: flex;
    margin-bottom: 40px;
    & > div {
      .back, .close {
        display: inline-flex;
      }
      .back:hover, .close:hover {
        color: $color-orange;
        cursor:pointer
      }
    }
    .headline {
      & .text {
        vertical-align: top;
      }
      & .back {
        margin-right: 1em;
      }
      display: flex;
      justify-content: space-between;
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 15px;
      font-family: $font-secondary;
    }
    .info {
      font-size: 0.9em;
      line-height: 1.3;
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
    padding: 0 0 5px;
    @include media-breakpoint-up(sm) {
      padding: 0 0 18px;
      display: grid;
      grid-template-columns: 28% 72%;
    }
    align-items: center;
    .label {
      font-weight: bold;
      text-transform: uppercase;
      font-size: .7em;
    }
    input {
      outline: none;
      flex-grow: 1;
      padding: 5px 10px;
      @include media-breakpoint-down(xs) {
        margin: 1vh 0;
      }
      background: #fff;
      border: 1px solid #fff;
      width: 100%;
      &:focus {
        border-color: $color-orange;
      }
    }
    .password-wrapper {
      position: relative;
      .password-status {
        position: absolute;
        right: 10px;
        top: 50%;
        background-color: $color-orange;
        height: .5em;
        width: .5em;
        padding: 0;
        margin-top: -.25em;
        border-radius: 50%
      }
    }
    .password-error {
      grid-column: 2;
    }
    &.button-row {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 80px; // fix for some strange ios safari error
    }
    button {
      background-color: $color-orange;
      color: #FFF;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 13px 9px;
      line-height: 1;
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
    .bad {
      color: $color-orange;
      font-size: .7em;
      font-weight: bold;
    }
  }
  .checkbox-item {
    padding: 8px 0;
    display: flex;
    .checkbox-wrapper {
      padding-right: .5em;
      outline: none;
      user-select: none;
      max-width: 180px;
    }
    label {
      user-select: none;
      flex: 1;
      font-size: .7em;
      letter-spacing: .03em;
      line-height: 1.2;
      font-weight: 700;
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
    .policy {
      font-size: 0.8em;
      color: #333;
      > ul {
        list-style-type: circle;
        padding: 0 0 0 1em;
        > li {
          margin: .4em 0 0 0;
          > ul {
            padding: 0 0 0 1em;
            list-style-type: circle;
            > li {
              margin: .4em 0 0 0;
            }
          }
        }
      }
    }
  }
}
</style>
