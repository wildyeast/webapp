<template>
  <div class="covidInfobox">
    <div class="boxContainer">
      <font-awesome-icon class="icon" icon="exclamation-triangle" />
      <div class="box">
        <div class="text">
          Deine Gesundheit ist uns wichtig. Deshalb finden unsere Workshops nur statt, insofern die aktuellen COVID-Maßnahmen der Bundesregierung dies zum Zeitpunkt der Abhaltung erlauben.<br><br>
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
  & .boxContainer {
    & .icon {
      position: absolute;
      font-size: 15em;
      margin-left: 1rem;
      margin-top: -0.5rem;
      color: $color-bright-bg;
      @include media-breakpoint-down(sm) {
        filter: opacity(0.3);
        margin-top: -3rem;
      }
    }
    & .box {
      display: flex;
      flex-direction: column;
      background-color: $color-yellow;
      width: 46em;
      @include media-breakpoint-down(sm) {
        width: 100%;
      }
      min-height: 12.5em;
      padding: 1em;
      border: 5px dashed black;
      margin: 2em;
      @include media-breakpoint-down(sm) {
        width: 95vw;
        margin: 0.3em;
      }
      & .text {
        margin-left: 15em;
        font-size: 1.1em;
        @include media-breakpoint-down(sm) {
          margin: 0;
          z-index: 2;
        }
      }
    }
  }
}
</style>