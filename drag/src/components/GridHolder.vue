<template>
<div class="vue-grid-placeholder">
  
</div>
</template>

<script>
export default {
  name: 'grid-holder',

  props: {
    holder: Object,
  },

  computed: {
    style() {
      const holder = this.holder;
      const translate = `translate(${holder.left}px,${holder.top}px)`;
      return {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        width: `${holder.width}px`,
        height: `${holder.height}px`,
        position: 'absolute',
      };
    },
  },
};
</script>

<style>
.vue-grid-placeholder {
  background: red;
  opacity: 0.2;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>