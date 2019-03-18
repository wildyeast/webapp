<template>
  <footer class="footer">
    <div class="pre-footer">

      <div class="pre-footer-top">
        <div class="logo">
          <img src="~/assets/img/icons/gg-logo.svg" alt>
        </div>
      </div>
      <div class="pre-footer-bottom">
        <div class="col text">Innovationswerkstatt für Menschen, Wissen und Technologie</div>
        <div class="col logos">
          <marquee :duration="Number(50)">
            <div class="logo" v-for="(logo) in this.logos" :key="logo._uid">
              <img :src="$resizeImage(logo.image, '200x0')">
            </div>
          </marquee>
        </div>
      </div>
    </div>
    <div class="background-footer">
      <div class="background-footer-content">
        <div class="newsletter-footer">
          <div class="newsletter-msg" v-if="loading">
            Loading...
          </div>
          <div class="newsletter-msg" v-else-if="subscribed">
            Danke für deine Anmeldung!
          </div>
          <form name="newsletter" @submit.prevent="handleSubmit" v-else data-netlify="true" netlify-honeypot="bot-field">
            <h4>Immer am Ball bleiben</h4>
            <label class="hidden"><input name="bot-field" /></label>
            <div data-netlify-recaptcha="true"></div>
            <div class="newsletter-subscribe">
              <input type="email" name="email" v-model="form.email" placeholder="Deine E-Mail Adresse">
              <button type="submit">Zum Newsletter anmelden</button>
            </div>
          </form>
        </div>
        <div class="bottom-footer">
          <div class="footer-navigation">
            <div
               class="nav-item"
               :key="index"
               v-for="(navitem, index) in $store.state.settings.footer_navi"
               >
               <sb-link :link="navitem.link">{{navitem.name}}</sb-link>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="info-item" v-for="item in $store.state.settings.footer_info" :key="item.id">
            <h4>{{item.headline}}</h4>
            <markdown :value="item.content"></markdown>
          </div>
        </div>
      </div>
      <div class="background-footer-image"></div>
    </div>
  </footer>
</template>

<script charset="utf-8">
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      subscribed: false,
      form: {
        email: '',
      }
    }
  },
  methods: {
    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    shuffle(arra1) {
      let ctr = arra1.length;
      let temp;
      let index;

      while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
      }
      return arra1;
    },
    handleSubmit () {
      if (this.form.email === '') return;
      this.loading = true;
      const axiosConfig = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };
      axios.post(
        "/",
        this.encode({
          "form-name": "newsletter",
          ...this.form
        }),
        axiosConfig
      ).then(() => {
        this.loading = false;
        this.subscribed = true;
      }).catch(() => {
        this.loading = false;
      });
    }
  },
  computed: {
    logos() {
      return this.shuffle(this.$store.state.settings.footer_logos);
    },
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";

.footer {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  .pre-footer {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='270px' height='900px'><path fill='white' d='M 101.424,0.5699981 0,48.061998 V 1000 H 270 V 46.754998 L 101.424,0.5699981'></path></svg>");
    background-size: cover;
    background-position: top right;
    background-repeat: no-repeat;
    padding-top: 10vh;
    .icon-bg {
      overflow: hidden;
      z-index: 0;
      fill: #fff;
      position: absolute;
      width: 80%;
      right: 0;
    }
    .pre-footer-top {
      z-index: 1;
      display: flex;
      justify-content: center;
      @include media-breakpoint-up(md) {
        padding: 7vh 0 6vh;
        .logo {
          width: 25%;
          min-width: 300px;
        }
      }
      @include media-breakpoint-down(sm) {
        padding: 5vh 0 2vh;
        .logo {
          width: 50%;
        }
      }
      img {
        max-width: 100%;
        display: block;
      }
    }
    .pre-footer-bottom {
      display: flex;
      @include media-breakpoint-down(sm) {
        flex-direction: column;
      }
      z-index: 1;
      margin-bottom: 10px;

      .col {
        flex: 1;
        margin-top: 3vh;
        margin-bottom: 3vh;
        @include media-breakpoint-up(md) {
          width: 50%;
        }
        &.text {
          text-transform: uppercase;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          @include media-breakpoint-up(md) {
            max-width: 21em;
            padding: 0 10px 0 40px;
            text-align: left;
          }
          @include media-breakpoint-down(sm) {
            margin-bottom: 3em;
          }
          line-height: 1.2em;
        }
        &.logos {
          height: 40px;
          display: flex;
          position: relative;
          overflow: hidden;
            &:before {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              height: 40px;
              z-index: 1;
              @include media-breakpoint-down(sm) {
                width: 100vw;
                background: linear-gradient(to right, rgba(255,255,255,1),rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,1));
              }
              @include media-breakpoint-up(md) {
                width: 50%;
                background: linear-gradient(to right, rgba(255,255,255,1),rgba(255,255,255,0));
              }
              pointer-events: none;
          }
          .marquee-text-content {
            height: 100%;
            &:hover > .marquee-text-text {
              animation-play-state: paused;
            }
            .marquee-text-text {
              height: 40px;
              display: inline-flex;
              float: none;
            }
          }
          .logo {
            margin-right: 50px;
            display: flex;
            img {
              display: block;
              max-width: 100%;
              max-height: 40px;
              width: auto;
              height: auto;
              object-fit: contain;
            }
          }
        }
      }
    }
  }
  .background-footer {
    padding: 50px 20px 20px 20px;
    color: #fff;
    overflow: hidden;
    background-color: #000;
    position: relative;
    .background-footer-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      opacity: 0.3;
      background-image: url(~assets/img/footer-bg.jpg);
      background-size: cover;
      background-position: center;
      height: 100%;
      z-index: 0;
    }
    .background-footer-content {
      padding: 20px;
      position: relative;
      z-index: 1;
      .newsletter-footer {
        .hidden {
          display: none;
        }
        .newsletter-msg {
          text-align: center;
        }
        h4 {
          max-width: 30%;
          letter-spacing: 0.2rem;
          text-transform: uppercase;
          font-size: 3rem;
        }
        .newsletter-subscribe {
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          display: flex;
          margin: 2rem 0 4rem 0;
          input {
            padding: 10px 0;
            font-size: 1rem;
            font-family: $font-secondary;
            outline: none;
            background: none;
            color: #fff;
            border: none;
            flex: 1;
            &::placeholder {
              color: #fff;
            }
            .arrow {
              display: inline-block;
              position: relative;
              width: 4em;
              @include media-breakpoint-down(sm) {
                width: 55%;
              }
              border-top: .1em solid #000;
              margin: .25em 1em;
              transition: transform .15s ease-out;
              &:after {
                content: "";
                position: absolute;
                right: -.1em;
                top: -.05em;
                border-top: .1em solid #000;
                border-right: .1em solid #000;
                width: .5em;
                height: .5em;
                transform-origin: right top;
                transform: rotate(45deg);
              }
            }
            &:hover {
              .arrow {
                transform: translateX(.5em);
              }
            }
          }
          button {
            cursor: pointer;
            font-family: $font-secondary;
            font-size: 1.3rem;
            color: #fff;
            background: none;
            border: none;
            outline: none;
          }
        }
      }
      .bottom-footer {
        margin: 3rem 0;
        display: flex;
        @include media-breakpoint-down(sm) {
          flex-direction: column;
        }
        .footer-navigation {
          .nav-item {
            font-size: 1rem;
            padding: 15px;
            padding-left: 0;
            a {
              color: #fff;
              text-decoration: none;
              text-transform: uppercase;
              font-weight: bold;
            }
          }
        }
        .spacer {
          flex: 1;
        }
        .info-item {
          padding: 15px;
          h4 {
            text-transform: uppercase;
          }
          p {
            font-family: $font-secondary;
          }
        }
      }
    }
  }
}
</style>
