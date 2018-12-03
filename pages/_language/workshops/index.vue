<template>
  <section class="workshop-overview">
    <div class="workshop-filters">
      <code v-if="loading">loading</code>
      <div class="tags">
        <div class="headline">
          BEREICHE
        </div>
        <div class="tag-list">
          <div v-for="t in tags" :key="t.key" class="tag">
            <input type="checkbox" value="" :name="t.key" :id="t.key"/>
            <label :for="t.key">{{t.name}}</label>
          </div>
        </div>
      </div>
      <div class="search">
        <input type="text" placeholder="Kurse und Workshops suchen" v-model="search" name="" id=""/>
        <input type="button" value="Suchen" name="" id=""/>
      </div>
    </div>
    <!--
    <div class="workshop-orders">
      <div class="headline">
        Sortieren nach:
      </div>
      <div class="order-list">
        <div class="order-item" v-for="o in orders">
        </div>
      </div>
    </div>
    -->
    <div class="workshop-list-wrapper">
      <div class="workshop-list">
        <workshop-list-item v-for="item in workshops" :blok="item.content" :key="item.id" v-if="item.content.component == 'workshop'"></workshop-list-item>
      </div>
      <div class="calendar">
        <date-pick v-model="date" :hasInputElement="false"></date-pick>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      date: '2019-01-01',
      search: '',
      tags: [
        { name: '3D-Druck', key: '3d-print', value: false },
        { name: 'CAD/CAM', key: 'cad-cam', value: false },
        { name: 'Lasercutter', key: 'lazzor', value: false },
      ],
    }
  },
  created() {
    this.$watch('tags', (newVal, oldVal) => {
      console.log(newVal);
    });
  },
  watch: {
    search() {
      this.update();
    }
  },
  methods: {
    update() {
      this.loading = true;
      let result = this.$store.dispatch("findWorkshops", this.filters).then((data) => {
        this.loading = false;
        this.workshops = result.data.stories;
      });
    }
  },
  computed: {
    filters() {
      return {
        tags: this.tags,
        query: this.search
      }
    }
  },
  asyncData (context) {
    let filters = {};
    return context.store.dispatch("findWorkshops", filters).then((data) => {
      if (data.stories) {
        return { workshops: data.stories };
      }
      return { workshops: [] };
    });
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.workshop-overview {
  .workshop-filters {
    .tags {
      .headline {
        color: #FFF;
        font-weight: bold;
        font-size: 1.8rem;
        margin-bottom: 20px;
      }
      .tag-list {
        margin: 0 -20px;
        .tag {
          display: inline-block;
          padding: 0 20px;
          font-family: $font-mono;
          color: #FFF;
          user-select: none;
          input[type=checkbox] {
            outline: none;
            -webkit-appearance: none;
            padding: 5px;
            border: 1px solid #FFF;
            border-radius: 3px;
            position: relative;
            top: 0;
            &:checked {
              background-color: #FFF;
            }
          }
        }
      }
      padding: 40px;
      background-color: $color-orange;
    }
    .search {
      display: flex;
      padding: 10px;
      padding-bottom: 5rem;
      input[type=text] {
        flex: 1;
        display: block;
        width: 100%;
        padding: 10px;
        outline: none;
        font-family: $font-secondary;
        font-size: 1.1rem;
        border: none;
      }
      input[type=button] {
        font-size: 1.1rem;
        margin-left: 10px;
        text-transform: uppercase;
        background-color: transparent;
        border: none;
        font-weight: bold;
        color: $color-orange;
        outline: none;
      }
    }
  }
  .workshop-list-wrapper {
    display: flex;
    padding: 20px;
    .workshop-list {
      flex: 3;
    }
    .calendar {
      flex: 1;
    }
  }
}
</style>
