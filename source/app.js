import {sync} from 'vuex-router-sync'; // eslint-disable-line
import Vue from 'vue';
import VeeValidate, {Validator} from 'vee-validate';  // eslint-disable-line
import VueResource from 'vue-resource';

import App from 'components/App/App.vue';
import mocks from './mocks';
import router from './router';
import store from './store';

import {TimelineMax, CSSPlugin, TweenMax, EasePack} from 'gsap'; // eslint-disable-line

import './stylesheets/aplication.styl';

const VueTouch = require('vue-touch');

const __svg__ = {path: './assets/images/sprite/*.svg', name: '[hash].logos.svg'}; // eslint-disable-line
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

Vue.use(VueTouch, {name: 'vtouch'});
Vue.use(VueResource);
Vue.url.options.root = '/api';

Vue.use(VeeValidate, {
  locale: 'en'
});

if (NODE_ENV !== 'development') {
  Vue.config.silent = true;
  Vue.config.devtools = false;
}

if (NODE_ENV === 'development') {
  Vue.http.interceptors.unshift((request, next) => {
    const route = mocks.find(item => {
      if (request.method === item.method && request.url === item.url) {
        if (item.params) {
          const hasAllParams = Object.keys(item.params).every(param => {
            return item.params[param] === request.params[param];
          });
          return hasAllParams;
        }
        return true;
      }
      return false;
    });

    if (!route) {
      // Предотвращаем реальный http запрос
      next(request.respondWith({status: 404, statusText: 'Not found!'}));
    } else {
      const response = typeof route.response === 'function' ? route.response(request) : route.response;
      next(
        request.respondWith(
          response,
          {status: 200}
        )
      );
    }
  });
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
});

const app = new Vue(Vue.util.extend({
  router,
  store
}, App));

app.$mount('#app');

export {app, router, store};
