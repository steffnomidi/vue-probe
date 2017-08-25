import {mapState, mapGetters, mapMutations} from 'vuex';

import headerModule from 'components/header/header.vue';

import {fadeIn, fadeOut} from 'helpers/animations.js';
import fontSizeHelper from 'helpers/fontSizeHelper';
import throttle from 'helpers/throttle';

export default {
  components: {
    headerModule
  },

  data() {
    return {
      fadeIn: fadeIn,
      fadeOut: fadeOut
    };
  },

  computed: {
    ...mapState([
      'app'
    ]),

    ...mapGetters([
      'isMobile'
    ])
  },

  watch: {},

  created: function () {
    this.$http.get('common').then(response => {
      this.setCommonData(response.body);
    });
  },

  mounted: function () {
    this.setLayoutType();
    this.setFontSize(fontSizeHelper.update(this.app.currentLayout));

    const onWindowResize = throttle(() => {
      this.setLayoutType();
      this.setFontSize(fontSizeHelper.update(this.app.currentLayout));
    }, 100);

    document.addEventListener('DOMContentLoaded', () => {
      this.setAppReady(true);
    });

    window.onload = () => {
      this.setAppLoad(true);
    };

    window.addEventListener('resize', onWindowResize);
  },

  methods: {
    ...mapMutations([
      'setAppReady',
      'setAppLoad',
      'setCommonData',
      'setCurrentLayout',
      'setFontSize'
    ]),

    setLayoutType: function () {
      const mqMobile = window.matchMedia('only screen and (max-width: 40em)');
      const mqTablet = window.matchMedia('only screen and (max-width: 75em)');

      if (mqMobile.matches) {
        this.setCurrentLayout('mobile');
      } else if (mqTablet.matches) {
        this.setCurrentLayout('tablet');
      } else {
        this.setCurrentLayout('desktop');
      }
    },

    hookAppEnter(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.set(el, {opacity: '0'})
        .to(el, .3, {opacity: '1', clearProps: 'opacity'}, '+=.3');
    }
  }
};
