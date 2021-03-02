<template>
    <div>
        <h2>Credits</h2>
        <loading-spinner v-if="isLoading" color="#333"></loading-spinner>
        <div class="credits" v-else>
          <div class="myCredits">
            <span>
              <font-awesome-icon icon="coins" />
              Meine Credits: {{ credits }}EUR
            </span>
            <button class="input-button-primary creditsButton" @click="$router.push(`giftcards?action=redeem`)">Gutschein einlösen</button>
          </div>
          <div class="logs">
            <div class="entry" v-for="log of logs" :key="log.id">
              <div class="date">{{new Date(log.date).toLocaleString('de-AT')}}</div>
              <div :class="['type', log.value > 0 ? 'green' : 'red']">{{ log.value > 0 ? 'Aufladung' : 'Abbuchung' }}</div>
              <div class="value">{{ Math.abs(log.value) }}EUR</div>
              <div class="info">
                <span v-if="log.refType === REF_TYPES.invoice">Rechnung #{{ log.refId }}</span>
                <span v-else>Gutschein <span v-if="log.refId">#{{ log.refId }}</span></span>
              </div>
            </div>
          </div>
        </div> 
    </div>

</template>

<script>
// import saveAs from "save-as";

const REF_TYPES = {
  invoice: 0,
  giftCard: 1
}

export default {
  name: "credits",
  middleware: "authenticated",
  data: () => ({
    credits: 0,
    isLoading: true,
    logs: null,
    REF_TYPES
  }),
  computed: {
  },
  created() {},
  async mounted () {
    const logs = await this.$store.dispatch('getCreditsLog')
    this.credits = await this.$store.dispatch('getCredits')
    let logsToPrint = []
    for (const entry of logs) {
      logsToPrint.push({
        date: entry.created_at,
        id: entry.id,
        value: entry.value,
        refId: entry.creditable_id,
        refType: entry.creditable_type && entry.creditable_type.endsWith('Invoice') ? REF_TYPES.invoice : REF_TYPES.giftCard
      })
    }
    this.logs = logsToPrint.sort((a, b) => a.id < b.id)
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  background-color: black;
  color: white;
  line-height: 1.6;
  font-family: $font-mono;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  padding: 0.8em;
  font-size: 1em;
  & .creditsButton {
    margin: 0;
  }
}

.entry:nth-child(odd) {
  background: #fafafa;
}

.entry {
  display: flex;
  flex-flow: row nowrap;
  padding: 0.4em;
  & .date {
    color: grey;
    margin-right: 0.5em;
    width: 10em;
  }
  & .green {
    color: green;
  }
  & .red {
    color: #c00;
  }
  & .type {
    width: 5em;
  }
  & .value {
    padding-left: 1em;
    text-align: right;
    width: 5em;
  }
  & .info {
    padding-left: 1em;
    // text-align: right;
    color: grey;
  }
}
</style>