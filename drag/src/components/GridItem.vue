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
export default {
  name: 'grid-item',

  props: {
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
    style() {
      const pos = this.calcPosition(this.x, this.y, this.w, this.h);

      const style = this.setTransform(pos.top, pos.left, pos.width, pos.height);

      return style;
    },
  },

  watch: {

  },

  methods: {
    calcColWidth() {
      return (this.containerWidth - (this.margin[0] * (this.cols + 1))) / this.cols;
    },

    calcPosition(x, y, w, h) {
      const colWidth = this.calcColWidth();

      /* eslint-disable no-mixed-operators */
      return {
        left: Math.round(colWidth * x + (x + 1) * this.margin[0]),
        top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
        // 0 * Infinity === NaN, which causes problems with resize constriants;
        // Fix this if it occurs.
        // Note we do it here rather than later because Math.round(Infinity) causes deopt
        width: w === Infinity
          ? w
          : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
        height: h === Infinity
          ? h
          : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1]),
      };
    },

    setTransform(top, left, width, height) {
      const translate = `translate(${left}px,${top}px)`;
      return {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
      };
    },

    down(e) {
      e.preventDefault();

      this.dragOffset = {
        dx: e.clientX - e.target.offsetLeft,
        dy: e.clientY - e.target.offsetTop,
      };

      this.canMove = true;
    },

    move(e) {
      if (this.canMove) {
        const els = e.target.style;
        els.left = `${(e.clientX - this.dragOffset.dx)}px`;
        els.top = `${(e.clientY - this.dragOffset.dy)}px`;
      }
    },

    up() {
      this.canMove = false;
      this.$el.querySelector('.draggable').classList.remove('dragging');
    },
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