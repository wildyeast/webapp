import Vue from 'vue';
import moment from 'moment';

Vue.prototype.$resizeImage = function(str, param) {
  return typeof str === 'undefined' ? '' : str.replace(/a.storyblok.com/g, 'img2.storyblok.com/' + param);
}

Vue.filter('date', function(value) {
  return moment(value).format('DD.MM.YYYY');
});

Vue.filter('time', function(value) {
  return moment(value).format('HH:mm');
});
