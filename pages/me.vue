<template>
    <div class="profile" v-if="user !== null">
      <div class="header">
        <h1 class="name">{{user.profile.firstName}} {{user.profile.lastName}}</h1>
        <code class="number">#{{user.profile.memberNumber}}</code>
        <div class="spacer"></div>
        <button @click="logout" class="logout-button">Logout</button>
      </div>
      <div class="section">
        <div class="content">
          <div class="section">
            <h2>Packages</h2>
            <ul class="item-list" v-if="user && user.packages && user.packages.length > 0">
              <li v-for="p in user.packages"><package :userPackage="p" /></li>
            </ul>
            <div v-else>
              <code>Keine Mitgliedschaft abgeschlossen</code>
            </div>
          </div>
          <div class="section">
            <h2>Trainings</h2>
            <ul class="item-list" v-if="user.trainings && user.trainings.length > 0">
              <li v-for="t in user.trainings"><training :userTraining="t" /></li>
            </ul>
            <div v-else>
              <code>Noch keine Trainings vorhanden</code>
            </div>
          </div>
          <div class="section">
            <h2>Kontakdaten</h2>
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
                <div v-if="loading">
                  Saving…
                </div>
                <button v-else type="submit" class="input-button-primary">Speichern</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      loading: false,
      activeSection: 'packages'
    }
  },
  created() {
  },
  methods: {
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
      this.loading = true;
      this.$store.dispatch('updateUser', Object.assign({}, this.user.profile)).then(() => {
        this.loading = false;
        this.$notify({
          title: 'Yay!',
          text: 'Änderungen gespeichert.'
        });
      }).catch((e) => {
        this.loading = false;
        this.$notify({
          title: 'Error',
          type: 'error',
          text: 'Ein Fehler ist aufgetreten.'
        });
      });
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
