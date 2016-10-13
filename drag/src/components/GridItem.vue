<template>

<div
  class="vue-grid-item"
  @mousedown="down"
  @mousemove="move"
  @mouseup="up"
  :style="style">

  <slot></slot>

  <span
    v-if="isResizable"
    class="vue-resizable-handle">
  </span>
</div>

</template>

<script>
/* eslint-disable no-mixed-operators */
import { mapActions } from 'vuex';

export default {
  name: 'grid-item',

  props: {
    index: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    w: {
      type: Number,
      required: true,
    },
    h: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      cols: 1,
      containerWidth: 100,
      rowHeight: 30,
      margin: [10, 10],

      canmove: false,
      isResizable: true,
      style: {},
      dragOffset: {},
    };
  },

  computed: {
    colWidth() {
      return (this.containerWidth - (this.margin[0] * (this.cols + 1))) / this.cols;
    },

    left() {
      return Math.round(this.colWidth * this.x + (this.x + 1) * this.margin[0]);
    },

    top() {
      return Math.round(this.rowHeight * this.y + (this.y + 1) * this.margin[1]);
    },

    width() {
      const w = this.w;
      return w === Infinity
          ? w
          : Math.round(this.colWidth * w + Math.max(0, w - 1) * this.margin[0]);
    },

    height() {
      const h = this.h;
      return h === Infinity
          ? h
          : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1]);
    },

    style() {
      const translate = `translate(${this.left}px,${this.top}px)`;
      return {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        width: `${this.width}px`,
        height: `${this.height}px`,
        position: 'absolute',
      };
    },
  },

  methods: {
    down(e) {
      e.preventDefault();

      this.dragOffset = {
        dx: e.clientX - this.left,
        dy: e.clientY - this.top,
      };

      this.canMove = true;
    },

    move(e) {
      if (this.canMove) {
        const left = e.clientX - this.dragOffset.dx;
        const top = e.clientY - this.dragOffset.dy;

        this.updateLayout({
          index: this.index,
          layout: {
            x: (left - this.margin[0]) / (this.colWidth + this.margin[0]),
            y: (top - this.margin[1]) / (this.rowHeight + this.margin[1]),
            w: this.w,
            h: this.h,
          },
        });
      }
    },

    up() {
      this.canMove = false;
    },

    ...mapActions([
      'updateLayout',
    ]),
  },
};
</script>

<style>
.vue-grid-item {
  transition: all 200ms ease;
  transition-property: left, top;
  -webkit-transition: box-shadow 100ms ease;
  color: white;
  background: #28f;
  box-shadow: 1px 1px 5px #444;
}
.vue-grid-item.cssTransforms {
  transition-property: transform;
}
.vue-grid-item.resizing {
  opacity: 0.6;
  z-index: 3;
}

.vue-grid-item.vue-draggable-dragging {
  /*transition:none;*/
  z-index: 3;
}

.vue-grid-item.vue-grid-placeholder {
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

.vue-grid-item > .vue-resizable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
  background-position: bottom right;
  padding: 0 3px 3px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: se-resize;
}
</style>