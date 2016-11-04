<template>
<div ref="layout"
  class="vue-grid-layout"
  :style="mergedStyle">

  <grid-holder
    v-if="isDragging"
    :holder="holder">
  </grid-holder>

  <slot></slot>

</div>
</template>

<script>
import interact from 'interact.js';
import GridHolder from 'components/GridHolder';
import { mapActions, mapGetters } from 'vuex';

import { getElementClientRect } from '../api/utils';

export default {
  name: 'grid-layout',

  components: {
    GridHolder,
  },

  props: {
    minHeight: {
      type: Number,
      default: 540,
    },

    bgColor: {
      type: String,
      default: '#fcfcfc',
    },
  },

  computed: {
    mergedStyle() {
      return {
        height: `${Math.max(this.height, this.minHeight)}px`,
        'background-color': this.bgColor,
      };
    },

    ...mapGetters({
      holder: 'getHolder',
      height: 'getWapperHeight',
      isDragging: 'getDragStatus',
      movingIndex: 'getMovingModule',
    }),
  },

  mounted() {
    interact(this.$refs.layout)
      .dropzone({
        accept: '.edit-module',
        overlap: 'pointer',
        ondragenter: (event) => {
          this.onEnter(event);
        },
        ondragleave: (event) => {
          this.onLeave(event);
        },
        ondrop: (event) => {
          this.onDrop(event);
        },
      });
  },

  methods: {
    onEnter() {
      const rect = getElementClientRect(this.$refs.layout);
      this.updateLayoutsRect({ rect });

      const index = this.movingIndex;
      this.moveModule({ index, module: { in: true } });
    },

    onLeave() {
      const index = this.movingIndex;
      this.moveModule({ index, module: { in: false } });
    },

    onDrop() {

    },

    ...mapActions([
      'changeStatus',
      'updateHolder',
      'moveModule',
      'updateLayoutsRect',
    ]),
  },
};
</script>

<style>
.vue-grid-layout {
  background-color: #e0e0e0;
  position: relative;
  transition: height 200ms ease;
}
</style>