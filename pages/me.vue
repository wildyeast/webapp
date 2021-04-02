<template>
    <div class="profile" v-if="user !== null">
      <div class="header">
        <h1 class="name">{{user.profile.firstName}} {{user.profile.lastName}}</h1>
        <code class="number">#{{user.profile.memberNumber}}</code>
      </div>
      <div class="tab-section">
        <div class="tab-section-menu">
          <MenuLink to="/me/" icon="user">Mein Profil</MenuLink>
          <MenuLink v-if="isMember" to="/me/packages" icon="cube">Packages</MenuLink>
<!--          <MenuLink v-if="!isMember && !hasCompletedOnboarding" to="/wizard/onboarding" icon="user-friends"><span class="fat">Mitglied werden!</span></MenuLink>-->
          <MenuLink to="/me/workshopBookings" icon="hammer">Meine Workshops</MenuLink>
<!--          <MenuLink to="/me/trainings" icon="graduation-cap">Einschulungen</MenuLink>-->
          <MenuLink to="/me/credits" icon="coins">Credits</MenuLink>
          <MenuLink :isActive="$route.name.includes('invoices')" to="/me/invoices" icon="file-invoice">Rechnungen</MenuLink>
          <!-- <MenuLink to="/me/trainings">Unterweisungen</MenuLink>-->
          <MenuLink to="/me/activities" icon="running">Aktivitäten</MenuLink>
          <MenuLink to="/me/giftcards" icon="gift">Gutscheine</MenuLink>
          <transition name="slide">
            <div class="submenu" v-if="$route.name.startsWith('me-giftcards')">
              <MenuLink :isActive="$route.query.action === 'buy'" to="/me/giftcards?action=buy">Gutschein kaufen</MenuLink>
              <MenuLink :isActive="$route.query.action === 'redeem'" to="/me/giftcards?action=redeem">Gutschein einlösen</MenuLink>
            </div>
          </transition>
          <!--<MenuLink to="/me/invoices">Meine Rechnungen</MenuLink>-->
         <!-- <MenuLink to="/me/log">Meine Aktivitäten</MenuLink>-->
        </div>
        <div class="tab-section-content">
          <NuxtChild :key="$route.params.slug"></NuxtChild>
        </div>
      </div>
    </div>
</template>

<script>
import MenuLink from '~/components/MenuLink'
export default {
  middleware: 'authenticated',
  components: { MenuLink },
  data () {
    return {
      hasCompletedOnboarding: true
    }
  },
  created() {
  },
  async mounted () {
    this.hasCompletedOnboarding = await this.$store.dispatch('hasCompletedOnboarding')
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
    isMember () {
      return this.$store.state.user.packages.length > 0;
    }
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
      .submenu {
        padding-left: 2.5em;
      }
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
  .fat {
    color: $color-blue-alt;
    font-weight: bolder;
  }
}
</style>
