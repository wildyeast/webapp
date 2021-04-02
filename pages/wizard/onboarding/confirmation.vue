<template>
  <div class="section">
    <h2>Yeah! Der erste Schritt zur GRAND GARAGE Membership ist geschafft!</h2>
    Jetzt musst du nur noch zum Frontdesk kommen um dein SEPA-Mandat zu unterzeichnen und deine Mitgliedschaft abzuschließen. Nimm hierzu bei einer ermäßigten Mitgliedschaft unbedingt deinen Ausweis mit.<br><br>
    Absolviere außerdem jetzt gleich die digitale ASU (Allgemeine Sicherheits-Unterweisung) um sofort in der Werkstatt durchstarten zu können. Einfach auf den folgenden Button klicken und loslegen!<br><br>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated',
  mounted () {
    this.$store.dispatch('getMemberCourses')
  }
}
</script>
<style lang="scss" scoped>
.section {
  text-align: center;
  margin-top: 1em;
}
</style>
