import {sync} from 'vuex-router-sync'; // eslint-disable-line
import Vue from 'vue';
import VeeValidate, {Validator} from 'vee-validate';  // eslint-disable-line
import VueResource from 'vue-resource';

import App from 'components/App/App.vue';
import router from './router';
import store from './store';

import {TimelineMax, CSSPlugin, TweenMax, EasePack} from 'gsap'; // eslint-disable-line

import './stylesheets/aplication.styl';

const VueTouch = require('vue-touch');

const __svg__ = {path: './assets/images/sprite/*.svg', name: '[hash].logos.svg'}; // eslint-disable-line
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

Vue.use(VueTouch, {name: 'vtouch'});
Vue.use(VueResource);

Vue.use(VeeValidate, {
  locale: 'en'
});

if (NODE_ENV === 'production') {
  Vue.config.silent = true;
  Vue.config.devtools = false;
}

router.afterEach((to, from) => { // eslint-disable-line
  let addTitle = to.path
    .split('/')
    .filter(item => item);

  addTitle.forEach((item, index) => {
    addTitle[index] = item.charAt(0).toUpperCase() + item.slice(1);
  });

  addTitle = addTitle.length ? ` — ${addTitle.join(' — ')}` : '';

  document.title = `Title${addTitle}`;

  // reset ui to default
  store.commit('setUiColor', 'white');
});

const app = new Vue(Vue.util.extend({
  router,
  store
}, App));

app.$mount('#app');

export {app, router, store};
