import Vue from 'vue';
import Router from 'vue-router';

const contacts = resolve => require(['views/contacts/contacts.vue'], resolve);
const home = resolve => require(['views/home/home.vue'], resolve);

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
