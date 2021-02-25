<template>
    <div>
        <h2>Credits</h2>
        <div class="credits">
          Hello my name is
        </div> 
    </div>

</template>

<script>
import saveAs from "save-as";

export default {
  name: "credits",
  middleware: "authenticated",
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
</style>