<template>
  <div class="register-success-form">
    <h3>Willkommen</h3>
    <p>Bitte prüfe deine Email um deinen Account zu bestätigen.</p>
    <p>Besuche unsere Info um eine Mitgliedschaft abzuschließen.</p>
    <button @click="close">Zurück</button>
  </div>
</template>

<script>

export default {
  props: ['blok'],
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    close() {
      this.$store.dispatch('setSidebar', null);
    },
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.register-success-form {
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
    padding: 0 0 18px;
    display: grid;
    grid-template-columns: 28% 72%;
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
  }
}
</style>
