import {mapGetters, mapMutations} from 'vuex';

import calcFontBase from 'helpers/calcFontSizer';

import removeHover from 'remove-hover'

export default {

  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapGetters([
      'appIsReady',
      'isMobile',
      'getUiColor'
    ])
  },

  watch: {},

  created: function () {
    this.$http.get('/data/common.json').then(response => {
      this.setCommonData(response.body);
    });

    removeHover();
  },

  mounted: function () {
    calcFontBase.update();

    this.setDeviceType();


    window.addEventListener('resize', () => {
      calcFontBase.update();
      this.setDeviceType();
    });

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        this.setAppReady(true);
      }, 300);
    });

    window.onload = () => {
      this.setAppLoad(true);
    };
  },

  methods: {
    ...mapMutations([
      'setAppReady',
      'setAppLoad',
      'setCommonData',
      'setCurrentDevice'
    ]),

    setDeviceType: function () {
        const mqMobile = window.matchMedia('only screen and (max-width: 40em)');

      if (mqMobile.matches) {
        this.setCurrentDevice('desktop');
      } else {
        this.setCurrentDevice('mobile');
      }
    },

    hookAppEnter(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.set(el, {opacity: '0'})
        .to(el, .3, {opacity: '1', clearProps: 'all', ease: Sine.easeOut}, '+=.3');
    },

    hookViewEnter(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.set(el, {opacity: '0'})
        .to(el, .3, {opacity: '1', clearProps: 'all', ease: Sine.easeOut});
    },

    hookViewLeave(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.set(el, {opacity: '1'})
        .to(el, .3, {opacity: '0', ease: Sine.easeOut});
    }
  }
};
