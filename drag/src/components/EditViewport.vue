<template>
<div class="edit-viewport">
  <div class="edit-viewport-screen" :style="mergeStyle">
    <slot></slot>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'edit-viewport',

  props: {
    width: {
      type: Number,
      default: 960,
    },

    height: {
      type: Number,
      default: 540,
    },
  },

  computed: {
    mergeStyle() {
      let width = this.width;
      let translate = 'translateX(0px)';
      if (this.contentH > this.height) {
        width += 20;
        translate = 'translateX(10px)';
      }

      return {
        height: `${this.height}px`,
        width: `${width}px`,
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
      };
    },

    ...mapGetters({
      contentH: 'getWapperHeight',
    }),
  },
};
</script>

<style>
.edit-viewport {
  position: absolute;
  top: 55px;
  right: 0;
  bottom: 0;
  left: 140px;
}
.edit-viewport-screen {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border: 1px solid #e5e5e5;
  box-shadow: 5px 5px 30px #ddd;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
