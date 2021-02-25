<template>
    <div>
        <h2>Credits</h2>
        <loading-spinner v-if="isLoading" color="#333"></loading-spinner>
        <div class="credits" v-else>
          <div class="myCredits">
            Meine Credits: {{ credits }}
          </div>
          <div class="log">
            <div class="logEntry" v-for="log of logs" :key="log.id">
              {{ log.value }}EUR aufgeladen am {{new Date(log.created_at).toLocaleDateString()}}
            </div>
          </div>
        </div> 
    </div>

</template>

<script>
import saveAs from "save-as";

export default {
  name: "credits",
  middleware: "authenticated",
  data: () => ({
    credits: 0,
    isLoading: true,
    logs: null
  }),
  computed: {},
  created() {},
  async mounted () {
    this.logs = await this.$store.dispatch('getCreditsLog')
    this.credits = await this.$store.dispatch('getCredits')
    this.isLoading = false;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
.myCredits {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 1em;
}
</style>