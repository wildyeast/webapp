<template>
  <label class="checkbox" :class="{'selected': value}">
    <input :value="value" @input="$emit('input', !value);" type="checkbox">
    <div class="checkmark">
      <img v-if="value" src="~/assets/img/icons/check.svg" alt=""/>
    </div>
    <slot />
  </label>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/styles.scss";

.checkbox {
  display: flex;
  user-select: none;

  input {
    display: none;
  }

  .checkmark {
    display: inline-block;
    width: 0.9em;
    height: 0.9em;
    border: 2px solid #000;
    border-radius: 2px;
    margin-right: 5px;
    padding: 2px;

    img {
      display: block;
      width: 100%;
      color: #fff;
    }
  }

  &:hover {
    .checkmark {
      background-color: $color-blue;
      border: none;
    }
  }

  &.selected {
    .checkmark {
      background-color: $color-blue;
      border: none;
    }
  }
}
</style>
