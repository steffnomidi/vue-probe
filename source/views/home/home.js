import {mapGetters} from 'vuex';

import icon from 'components/icon/icon.vue';

export default {
  name: 'home',

  components: {
    icon
  },

  data() {
    return {
      dataPage: null
    };
  },

  computed: {
    ...mapGetters([
      'getCommonData'
    ])
  },

  watch: {},

  created: function () {
    this.$http.get('/data/main.json').then(response => {
      this.dataPage = response.body;
    });
  },

  mounted: function () {},

  methods: {
    hookViewEnter: function (el, done) {
      const tl = new TimelineMax({
        onComplete: done
      });

      tl.set(el, {opacity: 0})
        .to(el, .5, {opacity: 1, clearProps: 'opacity'}, '+=.3');
    },

    hookViewLeave: function (el, done) {
      done();
    }
  },

  beforeDestroy() {}
};
