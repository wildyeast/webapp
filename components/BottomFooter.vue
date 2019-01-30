<template>
  <footer class="footer">
    <div class="pre-footer">
      <svg class="icon-bg" xmlns="http://www.w3.org/2000/svg" width="270" height="100">
        <path d="M101.424.285L0 47.777v51.938h270V46.47L101.424.285"></path>
      </svg>
      <div class="pre-footer-top">
        <div class="logo">
          <img src="~/assets/img/icons/gg-logo.svg" alt>
        </div>
      </div>
      <div class="pre-footer-bottom">
        <div class="col text">Innovationswerkstatt für Menschen, Wissen und Technologie</div>
        <div class="col logos">
          <marquee>
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
            Subscribed!
          </div>
          <form name="newsletter" @submit.prevent="handleSubmit" v-else>
            <h4>Immer am Ball bleiben</h4>
            <div class="newsletter-subscribe">
              <input type="email" name="email" v-model="form.email" placeholder="Deine E-Mail Adresse">
              <button type="submit">Meld mich an</button>
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
        email: ''
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
  display: flex;
  flex-direction: column;
  .pre-footer {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .icon-bg {
      overflow: hidden;
      z-index: 0;
      fill: #fff;
      position: relative;
      transform: scale(5) translateX(50%) translateY(50%);
      left: 0;
    }
    .pre-footer-top {
      z-index: 1;
      padding: 40px 0;
      display: flex;
      justify-content: center;
      .logo {
        width: 25%;
        @include media-breakpoint-down(sm) {
          width: 50%;
        }
        img {
          max-width: 100%;
          display: block;
        }
      }
    }
    .pre-footer-bottom {
      height: 8em;
      display: flex;
      @include media-breakpoint-down(sm) {
        flex-direction: column;
      }
      z-index: 1;
      margin-bottom: 10px;

      .col {
        flex: 1;
        padding: 0 25px;
        @include media-breakpoint-up(md) {
          width: 50%;
        }
        &.text {
          text-transform: uppercase;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        &.logos {
          margin: auto;
          max-height: 40px;
          display: flex;
          .marquee-text-content {
            height: 100%;
            .marquee-text-text {
              height: 100%;
            }
          }
          .logo {
            margin-right: 50px;
            height: 100%;
            display: inline-block;
            img {
              height: 100%;
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
          margin: 2rem;
          margin-bottom: 4rem;
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
          }
          button {
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
