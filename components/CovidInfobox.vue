<template>
  <div class="covidInfobox">
    <div class="boxContainer">
      <div class="box">
        <div class="title">
          COVID-19 INFO ZU DEN WORKSHOPS
        </div>
        <div class="text">
          Deine Gesundheit ist uns wichtig. Deshalb finden unsere Workshops nur statt, insofern die aktuellen
          COVID-Maßnahmen der Bundesregierung dies zum Zeitpunkt der Abhaltung erlauben. Für die Teilnahme bei Workshops
          gilt: Genesen, Getestet oder Geimpft. Genauere Infos findest du <NuxtLink to="/de/covid">
            hier
          </NuxtLink>. Im Sinn der gegenseitigen Rücksichtnahme
          bitten wir um Verständnis, dass in der GRAND GARAGE trotz ärztlicher Maskenbefreiung durchgehend ein
          Mund-Nasen-Schutz getragen werden muss.<br><br>

          Sollte es zu einer Absage kommen, werden dir die Workshop-Kosten selbstverständlich rückerstattet.<br><br>

          Wir freuen uns auf dich!
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
.covidInfobox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  font-family: $font-mono;
  & .boxContainer {
    & .box {
      display: flex;
      flex-direction: column;
      background-color: $color-yellow;
      width: 100vw;
      min-height: 12.5em;
      padding: 4em 5em;
      margin: 2em;
      & .title {
        font-size: 1.5em;
        font-weight: bolder;
      }
      & .text {
        margin-top: 1.5em;
        margin-right: 12em;
        line-height: 1.3em;
        @include media-breakpoint-down(sm) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
