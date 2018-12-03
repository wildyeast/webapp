import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'

import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

Vue.use(VueAwesomeSwiper)
Vue.component('date-pick', DatePick)
