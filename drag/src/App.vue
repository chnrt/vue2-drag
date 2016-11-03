<template>
<div id="edit">
  <router-view></router-view>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import GridLayout from 'components/GridLayout';
import GridItem from 'components/GridItem';
import Classbrand from 'components/Classbrand';

import { compact } from './api/utils';

export default {
  name: 'app',

  components: {
    GridLayout,
    GridItem,
    Classbrand,
  },

  data() {
    return {

    };
  },

  computed: {
    ...mapGetters({
      holder: 'getHolder',
      layouts: 'getLayouts',
    }),
  },

  methods: {
    addModule(index) {
      let y = 0;
      this.layouts.forEach((item) => {
        if (item.x === 0) {
          y = Math.max(y, item.y + item.h);
        }
      });

      this.addEL({
        layout: { x: 0, y, w: Math.min(2, index), h: Math.max(3, index), i: index },
      });

      const layouts = [].concat(this.layouts);
      compact(layouts, true);
      this.updateAll({ layouts });
    },

    ...mapActions([
      'addEL',
      'updateAll',
    ]),
  },
};
</script>

<style>
@import url('./assets/css/reset.css');
@import url('./assets/css/iconfont.css');

.container, .page-container {
  width: 100%;
  background-color: #324057;
}

</style>
