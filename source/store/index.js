import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    common: {
      uiColor: 'white',
      data: null,
    },
    currentDevice: 'desktop',
    app: {
      ready: null,
      load: null
    }
  },

  mutations: {
    setAppReady(state, payload) {
      state.app.ready = payload;
    },
    setAppLoad(state, payload) {
      state.app.load = payload;
    },
    setCurrentDevice(state, device) {
      state.currentDevice = device;
    },
    setUiColor(state, payload) {
      state.common.uiColor = payload;
    },
    setCommonData(state, payload) {
      state.common.data = payload;
    }
  },

  getters: {
    isMobile: state => {
      return state.currentDevice === 'mobile';
    },
    appIsReady: state => {
      return state.app.ready;
    },
    getCurrentDevice: state => {
      return state.currentDevice;
    },
    appIsLoad: state => {
      return state.app.load;
    },
    getUiColor: state => {
      return state.common.uiColor;
    },
    getCommonData: state => {
      return state.common.data;
    }
  }
});

export default store;
