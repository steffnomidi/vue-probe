import Vue from 'vue';
import Router from 'vue-router';

import home from 'views/home/home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
