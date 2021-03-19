<template>
  <div class="wizard" v-if="user !== null">
    <div class="header">
      <font-awesome-icon class="icon" icon="user-friends" />
      <h2>Mitglied werden</h2>
      <p>In 4 Schritten zu deiner Mitgliedschaft!</p>
    </div>
    <div class="wizard-section">
      <div class="wizard-section-menu">
        <div class="steps">
          <div v-for="s,i in steps" class="step" :class="{ 'icon': index > i, 'color': index >= i}">
            <NuxtLink class="dot" v-if="i == 0" to="/wizard/onboarding/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 200"><path d="M20 130l40 40L200 30" stroke-width="25" fill="none" stroke="#FFF"/></svg>
            </NuxtLink>
            <NuxtLink class="dot" v-else :to="'/wizard/onboarding/' + s">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 200"><path d="M20 130l40 40L200 30" stroke-width="25" fill="none" stroke="#FFF"/></svg>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="wizard-section-content">
        <NuxtChild :onboardingData=onboardingData :key="$route.params.slug"></NuxtChild>
      </div>
      <div class="wizard-section-nav">
        <div class="form">
          <div class="button-row">
            <button class="input-button-primary" v-if="index > 0" @click="back()">Zurück</button>
            <div class="spacer"></div>
            <button :class="['input-button-primary', { disabled: !nextStepEnabled }]" v-if="index < steps.length-1" :disabled="nextStepEnabled" @click="next()">Weiter</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      steps: ['index', 'contact', 'payment', 'done'],
      onboardingData: {
        membershipType: null,
        rulesAccepted: false,
        profile: {
          address: null,
          address2: null,
          city: null,
          zip: null,
          phone: null,
          birthdate: null,
          company: null
        },
        paymentType: null,
        sepaAccepted: false,
        payment: {
          iban: null,
          bank: null
        }
      }
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    getUserData () {
      const user = this.$store.state.user;
      if (sessionStorage.getItem('profile')) {
        this.onboardingData.profile = JSON.parse(sessionStorage.getItem('profile'))
        return
      }
      for (const key of Object.keys(this.onboardingData.profile)) {
        if (user.profile.hasOwnProperty(key)) {
          this.onboardingData.profile[key] = user.profile[key]
        }
      }
    },
    saveUserData () {
      this.$store.dispatch('updateUser', Object.assign({}, this.onboardingData.profile))
      sessionStorage.setItem('profile', JSON.stringify(this.onboardingData.profile))
    },
    back() {
      let ni = this.index - 1 < 0 ? 0 : this.index - 1;
      let path = this.steps[ni];
      if (ni == 0) {
        path = '';
      }
      this.$router.push('/wizard/onboarding/' + path);
    },
    next() {
      let ni = this.index + 1 < 0 ? 0 : this.index + 1;
      let path = this.steps[ni];
      if (path === 'payment') {
        this.saveUserData()
      }
      this.$router.push('/wizard/onboarding/' + path);
    },
  },
  computed: {
    activeStep() {
      return this.$route.path.split('/')[3] || 'index';
    },
    nextStepEnabled () {
      const data = this.onboardingData
      switch(this.activeStep) {
        case 'index':
          return !(data.membershipType && data.rulesAccepted)
        case 'contact':
          const requiredKeys = ['address', 'city', 'zip', 'phone', 'birthdate']
          return !!requiredKeys.filter(k => !data.profile[k]).length
        default:
          return false
      }
    },
    index() {
      return this.steps.indexOf(this.activeStep);
    },
    user() {
      return this.$store.state.user;
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.wizard {
  margin: 0 4%;
  & .header {
    margin-top: 1em;
    & .icon {
      font-size: 3em;
    }
  }
  .wizard-section {
    h2 {
      width: 100%;
      text-align: center;
    }
    display: flex;
    align-items: center;
    flex-direction: column;
    .wizard-section-menu {
      .steps {
        .step {
          display: inline-block;
          position: relative;
          &:before {
            z-index: -1;
            content: '';
            position: absolute;
            margin-top: -3px;
            top: 50%;
            right: -10px;
            border-bottom: 6px solid #999;
            width: 50px;
          }
          &.color {
            .dot {
              background-color: $color-orange;
            }
          }
          &.icon {
            .dot {
              svg {
                display: block;
              }
            }
            &:before {
              border-bottom: 6px solid $color-orange;
            }
          }
          .dot {
            height: $step-size;
            width: $step-size;
            display: inline-block;
            border-radius: 50%;
            margin-right: $step-size;
            background-color: #999;
            svg {
              display: none;
              padding: 8px;
              height: 30px;
            }
          }
          &:last-child {
            .dot {
              margin-right: 0;
            }
            &:before {
              display: none;
            }
          }
        }
      }
    }
    .wizard-section-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .wizard-section-nav {
      min-width: 50vh;
      .button-row {
        display: flex;
        flex-direction: row;
        .spacer {
          flex: 1;
        }
      }
    }
  }
  .input-button-primary:disabled {
    cursor: default;
    background-color: grey;
    border: 1px solid darkgrey;
  }
}
</style>
