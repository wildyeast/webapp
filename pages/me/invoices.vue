<template>
  <div>
    <h2>Meine Rechnungen</h2>
    <div class="invoices" v-if="invoices">
      <div :class="['invoice', { highlighted: highlightedId === invoice.uuid }]" v-for="invoice of invoices" :key="invoice.id">
        <div class="date">{{ new Date(invoice.issue_date).toLocaleDateString('de-AT') }}</div>
        <div class="name">{{ invoice.name }}</div>
        <div class="date">#{{ invoice.human_readable_id }}</div>
        <div class="status">Status: <span :class="[[4, 5].includes(invoice.status) ? 'green' : 'yellow']">{{ getStatus(invoice.status) }}</span></div>
        <div v-if="invoice.has_attachment" class="icon"><font-awesome-icon @click="getPdf(invoice.uuid)" icon="download" /></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "invoices",
  middleware: 'authenticated',
  data() {
    return {
      invoices: null,
      statuses: ["In Bearbeitung", "Bestellt", "Versendet", "Bezahlt", "Bezahlt", "Abbuchung wurde noch nicht durchgeführt", "Noch nicht Bezahlt"],
      highlightedId: null
    }
  },
  async mounted () {
    this.invoices = await this.$store.dispatch('getInvoices')
    console.log(this.invoices)
    this.invoices = this.invoices.reverse()
    this.getQuery(this.$route.query)
  },
  methods: {
    getQuery (to) {
      if (to.hasOwnProperty('id')) {
        this.highlightedId = to.id
      }
    },
    getStatus (status) {
      return this.statuses[status - 1]
    },
    getDate (date) {
      return new Date(date)
    },
    async getPdf (uuid) {
      const pdf = await this.$store.dispatch('getPDF', uuid)
      const blob = new Blob([pdf.data], { type: 'application/pdf' });
      window.open(URL.createObjectURL(blob))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.invoices {
  & .invoice {
    display: flex;
    flex-flow: row nowrap;
    padding: 0.4em;
    & * {
      margin-right: 2em;
    }
    & .date {
      color: grey;
    }
    & .green {
      color: green;
    }
    & .yellow {
      color: $color-orange;
    }
    & .status {
      min-width: 12em;
    }
    & .info {
      padding-left: 1em;
      // text-align: right;
      color: grey;
    }
    & .icon {
      display: flex;
      align-items: center;
      color: grey;
      & :hover {
        color: $color-blue-alt;
        cursor: pointer;
      }
    }
  }
}
.invoice:nth-child(odd) {
  background: #fafafa;
}
.highlighted {
  background: #ffcccc;
}
</style>