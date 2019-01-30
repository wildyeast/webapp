import Vue from 'vue';

import Lightbox from 'vue-pure-lightbox'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import DatePick from 'vue-date-pick';
import MarqueeText from 'vue-marquee-text-component'

Vue.use(Lightbox)
Vue.use(VueAwesomeSwiper)
Vue.component('marquee', MarqueeText)
Vue.component('date-pick', DatePick)
