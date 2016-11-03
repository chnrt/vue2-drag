<template>
<div
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
import GridHolder from 'components/GridHolder';
import { mapActions, mapGetters } from 'vuex';

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
    }),
  },

  methods: {
    ...mapActions([
      'changeStatus',
      'updateHolder',
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