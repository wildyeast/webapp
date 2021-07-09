<template>
  <div>
    <h2>Meine Rechnungen</h2>
    <loading-spinner
      v-if="!invoices"
      color="#333"
    />
    <div
      v-if="invoices"
      class="invoices"
    >
      <div
        v-for="invoice of invoices"
        :key="invoice.id"
        :class="['invoice', { pointer: invoice.has_attachment }, { highlighted: highlightedId === invoice.uuid }]"
        @click="getPdf(invoice)"
      >
        <div class="date">
          {{ new Date(invoice.issue_date).toLocaleDateString('de-AT') }}
        </div>
        <div class="name">
          {{ invoice.name }}
        </div>
        <div class="invoiceNumber">
          #{{ invoice.human_readable_id }}
        </div>
        <div class="status">
          Status: <span :class="[[4, 5].includes(invoice.status) ? 'green' : 'yellow']">{{ getStatus(invoice.status) }}</span>
        </div>
        <div
          v-if="invoice.has_attachment"
          class="icon"
        >
          <font-awesome-icon icon="download" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Invoices',
  middleware: 'authenticated',
  data () {
    return {
      invoices: null,
      statuses: ['In Bearbeitung', 'Bestellt', 'Versendet', 'Bezahlt', 'Bezahlt', 'Abbuchung wurde noch nicht durchgeführt', 'Noch nicht Bezahlt'],
      highlightedId: null
    }
  },
  async mounted () {
    this.invoices = await this.$store.dispatch('getInvoices')
    this.invoices = this.invoices.reverse().filter(i => i.status > 1)
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
    async getPdf (invoice) {
      if (!invoice.has_attachment) {
        return
      }
      const res = await this.$store.dispatch('getPDF', invoice.uuid)
      const blob = new Blob([res.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.download = invoice.filename + '.pdf'
      link.href = URL.createObjectURL(blob)
      link.click()
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
    @include media-breakpoint-down(sm) {
      flex-direction: column;
      position: relative;
      background-color: #fafafa;
      margin: 1em 0;
      border: 1px solid grey;
      border-radius: 0.3em;
      & .icon {
        position: absolute;
        top: 1em;
        right: 0;
        font-size: 1.3em;
        margin-right: -1em;
      }
      & .name {
        font-size: 1.1em;
        padding: 0.4em 0;
      }
      & .invoiceNumber {
        padding-bottom: 0.4em;
      }
    }
    & * {
      margin-right: 2em;
    }
    & .date {
      color: grey;
      width: 5em;
      transition: highlight 3s;
    }
    & .name {
      width: 10em;
    }
    & .invoiceNumber {
      width: 8em;
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
    }
  }
}
.invoice:nth-child(odd) {
  background: #fafafa;
}
.invoice:hover .icon {
  color: $color-blue-alt;
}
.pointer {
  cursor: pointer;
}
.highlighted {
  background: $color-yellow !important;
}
</style>
