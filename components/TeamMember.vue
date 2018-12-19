<template>
  <div v-editable="blok" class="member-page">
    <div class="header">
      <div class="image">
        <img class="picture" :src="$resizeImage(blok.image, '700x700')" :alt="blok.name + ', ' + blok.title"/>
      </div>
      <div class="info">
        <div class="short-info">
          <div class="name-contact">
            <div class="name">{{blok.name}}</div>
            <div class="contact-icons">
              <a class="contact-icon email" v-if="blok.email" :href="'mailto:'+blok.email">
                <img class="svg" src="~/assets/img/icons/envelope.svg" alt=""/>
              </a>
              <a class="contact-icon phone" v-if="blok.phone" :href="'tel:'+blok.phone">
                <img class="svg" src="~/assets/img/icons/phone.svg" alt=""/>
              </a>
              <a class="contact-icon twitter" v-if="blok.twitter" target="_blank" :href="'https://twitter.com/'+blok.twitter">
                <img class="svg" src="~/assets/img/icons/twitter.svg" alt=""/>
              </a>
              <a class="contact-icon linkedin" v-if="blok.linkedin" target="_blank" :href="blok.linkedin">
                <img class="svg" src="~/assets/img/icons/linkedin.svg" alt=""/>
              </a>
            </div>
          </div>
          <div class="title">{{blok.title}}</div>
        </div>
        <div class="short-description">
          {{blok.short_description}}
        </div>
      </div>
    </div>
    <div class="body">
      <div class="future-slogan">
        <div class="first">Die Zukunft</div>
        <div class="second">gehört {{blok.future}}</div>
      </div>
      <div class="description">
        <markdown :value="blok.description"></markdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
}
</script>

<style lang="scss">
@import '@/assets/scss/styles.scss';

.member-page {
  display: inline-block;
  @include margin-page-wide();
  min-height: 150px;
  width: 100%;

  .header {
    display: flex;
    .image {
      flex-grow: 1;
      width: 48%;
      margin-right: 2%;
      max-height: 85vh;
      text-align: right;
      .picture {
        width: 100%;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      width: 48%;
      margin-left: 2%;
      .short-info {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: flex-end;
        .name-contact {
          padding-bottom: 1rem;
          border-bottom: .4rem solid black;
          margin-bottom: 1rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          .name {
            font-family: $font-secondary;
            font-size: 4rem;
            text-transform: uppercase;
            line-height: 1.2;
            max-width: 60%;
          }
          .contact-icons {
            margin-bottom: .8rem;
            display: flex;
            .contact-icon {
              .svg {
                width: 18px;
                margin-left: .5em;
              }
            }
          }
        }
        .title {
          font-family: $font-mono;
          font-size: 1rem;
          margin-bottom: 2em;
        }
      }
      .short-description {
        line-height: 1.5;
        width: 80%;
        font-size: 1rem;
      }
    }
  }
  .body {
    padding: 100px 0;
    .future-slogan {
      transform: rotate(-5deg);
      font-size: 2rem;
      width: 40%;
      min-width: 15em;
      margin-left: 12%;
      margin-bottom: 9%;
      .first {
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: .2em;
      }
      .second {
        font-family: $font-secondary;
      }
    }
    .description {
      margin: 0 20% 0 30%;
    }
  }

  @media screen and (max-width: 767px) {
    margin: 0;
    padding: 0;
    .header {
      flex-direction: column;
      .image,.info {
        width: 100%;
        margin: 0;
      }
      .info {
        .short-info {
          flex-direction: row;
        }
        .name-contact {
          .name {
            font-size: 1em;
          }
        }
      }

    }
  }

}
</style>
