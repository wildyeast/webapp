<template>
  <section class="">
    <div class="profile" v-if="user">
      <div class="header">
        <h1 class="name">{{user.profile.firstName}} {{user.profile.lastName}}</h1>
        <code class="number">#{{user.profile.memberNumber}}</code>
        <span class="email">{{user.profile.emailAddress}}</span>
        <div class="spacer"></div>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
      <div class="body">
        <div class="tablist">
          <ul>
            <li :class="{ active: activeSection == 'packages' }" @click="setTab('packages')" >Packages</li>
            <li :class="{ active: activeSection == 'trainings' }" @click="setTab('trainings')">Trainings</li>
            <li :class="{ active: activeSection == 'profile' }" @click="setTab('profile')">Rechnungsdaten</li>
          </ul>
        </div>
        <div class="content">
          <div v-if="activeSection == 'packages'" class="section">
            <h2>Packages</h2>
            <ul class="item-list" v-if="user.packages && user.packages.length > 0">
              <li v-for="p in user.packages"><package :userPackage="p" /></li>
            </ul>
            <div v-else>
              <code>Keine Mitgliedschaft abgeschlossen</code>
            </div>
          </div>
          <div v-if="activeSection == 'trainings'" class="section">
            <h2>Trainings</h2>
            <ul class="item-list" v-if="user.trainings && user.trainings.length > 0">
              <li v-for="t in user.trainings"><training :userTraining="t" /></li>
            </ul>
            <div v-else>
              <code>Noch keine Trainings vorhanden</code>
            </div>
          </div>
          <div v-if="activeSection == 'profile'" class="section">
            <h2>Rechnungsdaten</h2>
            <form class="form" @submit.prevent="updateUser">
              <div class="form-item">
                <span class="label">Vorname</span>
                <input class="input-text" disabled type="text" v-model="user.profile.firstName" name="" id=""/>
              </div>
              <div class="form-item">
                <span class="label">Nachname</span>
                <input class="input-text" disabled type="text" v-model="user.profile.lastName" name="" id=""/>
              </div>
              <div class="form-item">
                <span class="label">Adresse</span>
                <input class="input-text" type="text" v-model="user.profile.address" name="" id=""/>
              </div>
              <div class="form-item">
                <span></span>
                <input class="input-text" type="text" v-model="user.profile.address2" name="" id=""/>
              </div>
              <div class="form-item">
                <span class="label">PLZ</span>
                <input class="input-text" type="text" v-model="user.profile.zip" name="" id=""/>
              </div>
              <div class="form-item">
                <span class="label">Stadt</span>
                <input class="input-text" type="text" v-model="user.profile.city" name="" id=""/>
              </div>
              <div class="button-row">
                <button type="submit" class="input-button-primary">Speichern</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      activeSection: 'packages'
    }
  },
  created() {
  },
  methods: {
    setTab(section) {
      this.activeSection = section;
    },
    getPackage(p) {
      let data = this.$store.getters.getPackageById(p.package);
      return { ...p, ...data };
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
    updateUser(event) {
      this.$store.dispatch('updateUser', Object.assign({}, this.user.profile));
    }
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
  .body {
    display: flex;
    flex-direction: row;
    .tablist {
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        margin-right: 1em;
        li {
          background-color: #FFF;
          cursor: pointer;
          user-select: none;
          padding: 0.5em 1em;
          &.active {
            font-weight: bold;
          }
        }
      }
    }
    .content {
      flex: 1;
      .section {
      }
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
}
</style>
