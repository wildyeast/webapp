<template>
  <section class="workshop-overview">
    <div class="workshop-list">
      <workshop-list-item v-for="item in stories" :blok="item.content" :key="item.id" v-if="item.content.component == 'workshop'"></workshop-list-item>
    </div>
    <div class="calendar">
      <date-pick v-model="date" :hasInputElement="false"></date-pick>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      total: 0, data: { stories: [] },
      date: '2019-01-01'
    }
  },
  asyncData (context) {
    let filters = {};
    return context.store.dispatch("findWorkshops", filters);
  },
}
</script>

<style lang="scss">
.workshop-overview {
  display: flex;
  .workshop-list {
    flex: 3;
  }
  .calendar {
    flex: 1;
  }
}
</style>
