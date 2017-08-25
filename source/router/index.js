import Vue from 'vue';
import Router from 'vue-router';

import contacts from 'views/contacts/contacts.vue';
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
      path: '/contacts',
      name: 'Contacts',
      component: contacts
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
