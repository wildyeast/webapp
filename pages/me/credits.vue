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
            <div :class="['entry', { pointer: log.refType=== REF_TYPES.invoice }]" v-for="log of logs" :key="log.id" @click="showInvoices(log)">
              <div class="date">{{new Date(log.date).toLocaleString('de-AT')}}</div>
              <div :class="['type', log.value > 0 ? 'green' : 'red']">{{ log.value > 0 ? 'Aufladung' : 'Abbuchung' }}</div>
              <div class="value">{{ Math.abs(log.value) }}EUR</div>
              <div class="info">
                <template v-if="log.refType === REF_TYPES.invoice">
                  <span class="link">Rechnung #{{ log.invoiceId }}</span>
                  <div class="icon"><font-awesome-icon icon="link" /></div>
                </template>
                <template v-else-if="log.refType === REF_TYPES.giftCard">
                  Gutschein
                </template>
                <span v-else>Gutschrift</span>
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
  giftCard: 1,
  manual: 2
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
  async mounted () {
    const logs = await this.$store.dispatch('getCreditsLog')
    this.credits = await this.$store.dispatch('getCredits')
    const invoices = await this.$store.dispatch('getInvoices')
    let logsToPrint = []
    for (const entry of logs) {
      const invoice = invoices.find(i => i.id === entry.creditable_id)
      const log = {
        date: entry.created_at,
        id: entry.id,
        value: entry.value,
        invoiceId: invoice ? invoice.human_readable_id : null,
        invoiceUuid: invoice ? invoice.uuid : null
      }
      if (entry.creditable_type) {
        if (entry.creditable_type.endsWith('Invoice')) {
          log.refType = REF_TYPES.invoice
        } else {
          log.refType = REF_TYPES.giftCard
        }
      } else {
        log.refType = REF_TYPES.manual
      }
      logsToPrint.push(log)
    }
    this.logs = logsToPrint.sort((a, b) => a.id < b.id)
    this.isLoading = false;
  },
  methods: {
    showInvoices (log) {
      if (log.refType === REF_TYPES.invoice) {
        this.$router.push(`invoices?id=${log.invoiceUuid}`)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
.myCredits {
  display: flex;
  flex-flow: row nowrap;
  @include media-breakpoint-down(sm) {
    flex-direction: column;
  }
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
    @include media-breakpoint-down(sm) {
      margin-top: 1em;
    }
  }
}

.entry:nth-child(odd) {
  background: #fafafa;
}

.entry {
  display: flex;
  flex-flow: row nowrap;
  padding: 0.4em;
  @include media-breakpoint-down(sm) {
    flex-direction: column;
    background-color: #fafafa;
    margin: 1em 0;
    border: 1px solid grey;
    border-radius: 0.3em;
    position: relative;
    & .type {
      font-size: 1.1em;
      padding: 0.4em 0;
    }
    & .value {
      padding-bottom: 0.4em;
    }
    & .icon {
      position: absolute;
      top: 1em;
      right: 1em;
      font-size: 1.3em;
    }
  }
  & .date {
    color: grey;
    width: 10em;
  }
  & .green {
    color: green;
  }
  & .red {
    color: #c00;
  }
  & .type {
    width: 8em;
  }
  & .value {
    width: 5em;
  }
  & .info {
    display: flex;
    flex-flow: row nowrap;
    color: grey;
  }
  & .link {
    margin-right: 1em;
  }
  & .icon {
    display: flex;
    align-items: center;
    color: grey;
  }
}
.entry:hover .icon {
  color: $color-blue-alt;
}
.pointer {
  cursor: pointer;
}
.link:hover {
  cursor: pointer;
}
</style>