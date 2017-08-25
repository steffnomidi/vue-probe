import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app
  },
  state: {
    commonData: null
  },
  mutations: {
    setCommonData(state, payload) {
      state.commonData = payload;
    }
  }
});

export default store;
