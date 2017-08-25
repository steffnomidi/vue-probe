import {mapState, mapMutations} from 'vuex';

import icon from 'components/icon/icon.vue';

export default {
  name: 'contacts',

  components: {
    icon
  },

  data() {
    return {};
  },

  computed: {
    ...mapState([
      'commonData'
    ])
  },

  watch: {},

  created() {
    this.setUiColor('black');
  },

  mounted: function () {},

  methods: {
    ...mapMutations([
      'setUiColor'
    ])
  },

  beforeDestroy() {}
};
