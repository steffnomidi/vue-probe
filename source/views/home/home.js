import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
  name: 'home',

  components: {},

  data() {
    return {
      dataPage: null
    };
  },

  computed: {
    ...mapState([
      'commonData'
    ]),

    ...mapGetters([
      'isMobile'
    ])
  },

  watch: {},

  created: function () {
    this.$http.get('home').then(response => {
      this.dataPage = response.body;
    });

    this.setUiColor('white');
  },

  mounted: function () {},

  methods: {
    ...mapMutations([
      'setUiColor'
    ]),

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
