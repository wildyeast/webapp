<template>
  <div v-editable="blok" class="centered-text">
    <p>{{ blok.text }}</p>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.centered-text {
  padding: 5rem;
  font-family: 'Chakra Petch';
  color: #0069aa;
  font-size: 2rem;
  line-height: 1.5;
}
</style>
