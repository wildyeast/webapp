<template>
  <label v-bind:class="isChecked ? 'checkbox checkbox-selected' : 'checkbox'">
    <input v-model="isChecked" type="checkbox" v-on:change="onchange">

    <div class="checkmark">
      <span v-if="isChecked">✔</span>
    </div>
    {{text}}
  </label>
</template>

<script>
export default {
  props: ["text", "checked", "onchange"], // !!

  data() {
    return { isChecked: this.checked };
  },

  created() {
    this.$watch("isChecked", newVal => this.onchange(newVal));
  }
};
</script>

<style lang="scss">
@import "~/assets/scss/styles.scss";

.checkbox {
  display: flex;
  user-select: none;

  input {
    display: none;
  }

  .checkmark {
    width: 0.9em;
    height: 0.9em;
    border: 2px solid #000;
    border-radius: 2px;
    margin-right: 5px;

    span {
      color: #fff;
    }
  }
}

.checkbox:hover {
  .checkmark {
    background-color: $color-blue;
    border: none;
  }
}

.checkbox-selected {
  .checkmark {
    background-color: $color-blue;
    border: none;
  }
}
</style>