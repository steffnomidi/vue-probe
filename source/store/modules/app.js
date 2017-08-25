export default {
  state: {
    fontSize: 0,
    currentLayout: null,
    isReady: null,
    isLoad: null,
    uiColor: null
  },
  mutations: {
    setAppReady(state, payload) {
      state.isReady = payload;
    },
    setAppLoad(state, payload) {
      state.isLoad = payload;
    },
    setCurrentLayout(state, device) {
      state.currentLayout = device;
    },
    setFontSize(state, payload) {
      state.fontSize = payload;
    },
    setUiColor(state, payload) {
      state.uiColor = payload;
    }
  },
  getters: {
    isMobile: state => {
      return state.currentLayout === 'mobile';
    }
  }
};
