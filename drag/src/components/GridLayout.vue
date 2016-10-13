<template>
<div class="vue-grid-layout" :style="mergedStyle">

  <slot></slot>

  <grid-item
    class="vue-grid-placeholder"
    v-if="isDragging"
    :x="placeholder.x"
    :y="placeholder.y"
    :w="placeholder.w"
    :h="placeholder.h">
  </grid-item>
</div>
</template>

<script>
export default {
  name: 'grid-layout',

  props: {

  },

  data() {
    return {
      mergedStyle: {},
      isDragging: false,
      placeholder: {
        x: 0,
        y: 0,
        w: 4,
        h: 4,
      },
    };
  },

  computed: {

  },

  methods: {

  },
};
</script>

<style>
.vue-grid-layout {
  background-color: #e0e0e0;
  position: relative;
  transition: height 200ms ease;
  height: 600px;
}
</style>