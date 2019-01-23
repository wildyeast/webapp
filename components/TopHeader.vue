<template>
  <div class="header-wrapper">
    <div class="login-header" v-if="hasAuth">
      <div class="login-header-content">
        <nuxt-link to="/me" v-if="hasUser">
          {{username}}
        </nuxt-link>
        <span v-else>Loading</span>
      </div>
    </div>
    <header class="top-header">
      <div class="top-header-inner">
        <div class="logo">
          <nuxt-link class="top-header__link" to="/">
            <img src="~/assets/img/icons/gg-logo-icon.svg">
          </nuxt-link>
          <div class="dropdown" v-if="home && home.length > 0">
            <div v-for="child in home" :key="child.id" class="child">
              <sb-link :link="child.link" class="child-nav-item">
                {{ child.name }}
              </sb-link>
            </div>
          </div>
        </div>
        <div class="spacer"></div>
        <main-nav-item class="desktop" :item="item" :key="item.id" v-for="item in main">
        </main-nav-item>
        <div v-if="!hasAuth" class="login-button">
          <button @click="login">LOGIN</button>
        </div>
        <div class="menu-icon" @click="toggleMenu()">
          <img src="~/assets/img/icons/menu-icon.svg">
        </div>
      </div>
    </header>
    <div class="mobile-nav" v-show="showMenu" @click="toggleMenu()">
      <main-nav-item class="mobile" :item="item" :key="item.id" v-for="item in main">
      </main-nav-item>
    </div>
  </div>
</template>

<script charset="utf-8">
export default {
  props: ['blok'],
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    loginLink() {
      return '/' + this.$store.state.language + '/login';
    },
    main() {
      return this.$store.state.settings.main_navi;
    },
    home() {
      return this.$store.state.settings.home_navi;
    },
    username() {
      return this.$store.state.user.profile.firstName + ' ' + this.$store.state.user.profile.lastName;
    },
    hasAuth() {
      return !!this.$store.state.auth;
    },
    hasUser() {
      return !!this.$store.state.user;
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    login() {
      this.$store.dispatch('setSidebar', 'login');
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.header-wrapper {
  background-color: $color-bright-bg;
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  max-width: 100%;
  .login-header {
    background-color: $color-blue-alt;
    padding: 5px;
    color: #FFF;
    text-align: right;
    font-size: 0.85em;
    height: 1.7em;
    .login-header-content {
      @include margin-page-wide();
    }
    a {
      color: #FFF;
    }
  }
}

.top-header {
  @include margin-page-wide();
  font-size: 1.1em;
  @media screen and (min-width: 1149px) {
    letter-spacing: .1em;
  }
  .top-header-inner {
    display: flex;
    justify-content: space-between;
    margin: 0 -15px 0 -20px; // compensate paddings from logo and nav items
    .login-button {
      padding: 12px 15px 18px 15px;
      button {
        font-weight: bold;
        padding: 10px;
        outline: none;
        width: 100%;
        color: #FFF;
        border: none;
        background-color: $color-orange;
        margin: 3px 0;
        cursor: pointer;
      }
    }
  }

  .logo {
    position: relative;
    &:hover {
      .dropdown {
        display: block;
      }
    }
    a {
      padding: 20px;
      display: block;
      img {
        height: 1.1em;
      }
    }
    .dropdown {
      display: none;
      position: absolute;
      padding: 20px;
      background-color: #FFF;
      min-width: 150px;
      left: 18px;
      text-align: left;
      .child {
        .child-nav-item {
          white-space: nowrap;
          display: block;
          text-transform: uppercase;
          color: #000;
          text-decoration: none;
          font-weight: bold;
          font-size: 0.9rem;
          padding: 8px;
        }
      }
    }
  }

  .menu-icon {
    display: none;
  }

  .spacer {
    flex: 1;
  }
}



.mobile-nav {
  display: none;
}

/* Mobile */
@include media-breakpoint-down(sm) {
  .top-header {
    .top-header-inner {
      display: flex;
      justify-content: flex-end;
      margin: 0 -20px 0 -20px; // compensate paddings from logo and burger button
    }
    .nav-item.desktop {
      display: none;
    }

    .logo {
      img {
        height: 1.1em;
      }
    }
    .menu-icon {
      padding: 20px;
      img {
        height: 1.1em;
      }
    }
    .spacer {
      flex: 1;
    }

    .menu-icon {
      display: block;
    }

  }

  .mobile-nav {
    background-color: $color-bright-bg;
    padding-left: 20px;
    display: block;
    position: relative;
    top: 0;
    overflow-y: auto;
    height: 100vh;
  }
}

</style>
