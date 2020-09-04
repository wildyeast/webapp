<template>
    <div class="profile" v-if="user !== null">
      <div class="header">
        <h1 class="name">{{user.profile.firstName}} {{user.profile.lastName}}</h1>
        <code class="number">#{{user.profile.memberNumber}}</code>
        <div class="spacer"></div>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
      <div class="tab-section">
        <div class="tab-section-menu">
          <NuxtLink to="/me/">Mein Profil</NuxtLink>
          <NuxtLink to="/me/packages">Packages</NuxtLink>
          <!-- <NuxtLink to="/me/trainings">Unterweisungen</NuxtLink>-->
          <NuxtLink to="/me/shop">Material bestellen</NuxtLink>
          <!--<NuxtLink to="/me/invoices">Meine Rechnungen</NuxtLink>-->
         <!-- <NuxtLink to="/me/log">Meine Aktivitäten</NuxtLink>-->
        </div>
        <div class="tab-section-content">
          <NuxtChild :key="$route.params.slug"></NuxtChild>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
    getPackage(p) {
      let data = this.$store.getters.getPackageById(p.package);
      return { ...p, ...data };
    },
    getWorkshops(){
      // let data = this.$store.getters.getMemberCourseById(p);
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.profile {
  min-height: 60vh;
  margin-left: 4%;
  margin-right: 4%;
  .header {
    margin: 2em 0;
    h1 {
      margin: 0;
    }
    display: flex;
    .spacer {
      flex: 1;
    }
    .logout-button {
      cursor: pointer;
      font-weight: bold;
      padding: 10px;
      border: none;
      outline: none;
      color: #FFF;
      background-color: $color-orange;
    }
  }
  .name {
    display: inline-block;
  }
  .number {
    margin: 0 10px;
    color: #999;
  }
  .item-list {
    list-style-type: none;
    padding: 0;
  }

  .tab-section {
    display: flex;
    @include media-breakpoint-down(sm) {
      display: block;
    }
    .tab-section-menu {
      padding-top: 20px;
      width: 200px;
      flex: 1;
      a {
        color: #000;
        display: block;
        padding: 12px;
        &:hover {
          background-color: darken($color-bright-bg, 5)
        }
        &.nuxt-link-exact-active {
          color: $color-orange;
        }
      }
    }

    .tab-section-content {
      padding-left: 20px;
      flex: 3;
      @include media-breakpoint-down(sm) {
        padding: 0 15px;
      }
    }
  }
}
</style>
