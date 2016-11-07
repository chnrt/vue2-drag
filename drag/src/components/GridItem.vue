<template>

<div
  ref="item"
  class="vue-grid-item"
  :class="{ 'vue-draggable-dragging': isDraging }"
  :style="style">

  <slot></slot>
  
  <span
    @click="delItem"
    class="vue-delete-handle">
    <i class="iconfont icon-chahao"></i>
  </span>

  <span
    v-if="isResizable"
    class="vue-resizable-handle">
  </span>
</div>

</template>

<script>
/* eslint-disable no-mixed-operators */
import interact from 'interact.js';
import { mapGetters, mapActions } from 'vuex';
import { compact, moveElement, getMax } from '../api/utils';

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
    cols: {
      type: Number,
      default: 4,
    },
    containerWidth: {
      type: Number,
      default: 960,
    },
    rowHeight: {
      type: Number,
      default: 70,
    },
    margin: {
      type: Array,
      default() {
        return [5, 5];
      },
    },
  },

  data() {
    return {
      isResizable: true,

      dragOffset: {},

      isDraging: false,
      isResizing: false,
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

    maxX() {
      return this.cols - this.w;
    },
    maxW() {
      return this.cols - this.x;
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

    ...mapGetters({
      holder: 'getHolder',
      layouts: 'getLayouts',
    }),
  },

  mounted() {
    interact(this.$refs.item)
      .draggable({})
      .resizable({
        preserveAspectRatio: false,
        edges: { left: false, right: true, bottom: true, top: false },
      })
      .on('resizestart', (event) => {
        this.resizeStart(event);
      })
      .on('resizemove', (event) => {
        this.resizeMove(event);
      })
      .on('resizeend', (event) => {
        this.resizeEnd(event);
      })
      .on('dragstart', (event) => {
        this.dragStart(event);
      })
      .on('dragmove', (event) => {
        this.dragMove(event);
      })
      .on('dragend', (event) => {
        this.dragEnd(event);
      });

    this.$nextTick(() => {
      this.resetWapper();
    });
  },

  methods: {
    start(e) {
      this.dragOffset = {
        dx: e.clientX - this.left,
        dy: e.clientY - this.top,
        cx: e.clientX,
        cy: e.clientY,
      };

      this.changeStatus({ status: true });

      this.updateHolder({
        holder: {
          index: this.index,
          x: this.x,
          y: this.y,
          w: this.w,
          h: this.h,
          left: this.left,
          top: this.top,
          width: this.width,
          height: this.height,
        },
      });
    },

    end() {
      this.updateLayout({
        index: this.index,
        layout: {
          x: this.holder.x,
          y: this.holder.y,
          w: this.holder.w,
          h: this.holder.h,
          data: this.layouts[this.index].data,
        },
      });
      this.changeStatus({ status: false });

      this.resetWapper();
    },

    resizeStart(e) {
      this.start(e);
      this.isResizing = true;
    },

    resizeMove(e) {
      if (this.isResizing) {
        const gw = e.clientX - this.dragOffset.cx;
        const gh = e.clientY - this.dragOffset.cy;
        this.dragOffset.cx = e.clientX;
        this.dragOffset.cy = e.clientY;

        const realW = (this.width + gw + this.margin[0]) / (this.colWidth + this.margin[0]);
        const realH = (this.height + gh + this.margin[1]) / (this.rowHeight + this.margin[1]);
        const w = Math.min(this.maxW, Math.max(1, Math.round(realW)));
        const h = Math.max(1, Math.round(realH));

        const layouts = [].concat(this.layouts);
        const holder = layouts[this.index] =
          { x: this.x, y: this.y, w, h, data: layouts[this.index].data };
        compact(layouts, true);

        layouts[this.index] = {
          x: this.x,
          y: this.y,
          w: Math.min(this.maxW, Math.max(1, realW)),
          h: Math.max(1, realH),
          data: layouts[this.index].data,
        };

        this.updateHolder({
          holder: {
            index: this.index,
            x: holder.x,
            y: holder.y,
            w: holder.w,
            h: holder.h,
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height,
          },
        });

        this.updateAll({ layouts });
        this.resetWapper();
      }
    },

    resizeEnd() {
      this.resizing = false;
      this.end();
    },

    dragStart(e) {
      e.preventDefault();
      this.start(e);

      this.isDraging = true;
    },

    dragMove(e) {
      if (this.isDraging) {
        const left = e.clientX - this.dragOffset.dx;
        const top = e.clientY - this.dragOffset.dy;

        const pos = this.calcXY(top, left);
        const layouts = this.layouts;
        const newLayouts = moveElement(layouts, layouts[this.index], pos.x, pos.y, true);
        compact(newLayouts, true);

        const holder = newLayouts[this.index];
        this.updateHolder({
          holder: {
            index: this.index,
            x: holder.x,
            y: holder.y,
            w: holder.w,
            h: holder.h,
            left: Math.round(this.colWidth * holder.x + (holder.x + 1) * this.margin[0]),
            top: Math.round(this.rowHeight * holder.y + (holder.y + 1) * this.margin[1]),
            width: this.width,
            height: this.height,
          },
        });

        newLayouts[this.index] = {
          x: (left - this.margin[0]) / (this.colWidth + this.margin[0]),
          y: (top - this.margin[1]) / (this.rowHeight + this.margin[1]),
          w: this.w,
          h: this.h,
          data: newLayouts[this.index].data,
        };

        this.updateAll({ layouts: newLayouts });
        this.resetWapper();
      }
    },

    dragEnd() {
      this.isDraging = false;
      this.end();
    },

    calcXY(top, left) {
      let x = Math.round((left - this.margin[0]) / (this.colWidth + this.margin[0]));
      let y = Math.round((top - this.margin[1]) / (this.rowHeight + this.margin[1]));

      // Capping
      x = Math.min(this.maxX, Math.max(x, 0));
      y = Math.max(y, 0);

      return { x, y };
    },

    resetWapper() {
      const max = getMax(this.layouts);
      const height = max * (this.rowHeight + this.margin[1]) + this.margin[1];

      this.updateWapper({ height });
    },

    delItem() {
      const layouts = [].concat(this.layouts);
      const data = layouts[this.index].data;
      layouts.splice(this.index, 1);
      compact(layouts, true);

      this.updateAll({ layouts });
      this.resetWapper();

      // add module
      this.addModule({ module: {
        data,
        left: 0,
        top: 0,
        moving: false,
        in: false,
      } });
    },

    ...mapActions([
      'changeStatus',
      'updateHolder',
      'updateLayout',
      'updateWapper',
      'updateAll',
      'deleteEL',
      'addModule',
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
  box-shadow: 1px 1px 3px #444;
  /* cursor: move; */
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
  box-shadow: 5px 5px 20px #444;
  z-index: 3;
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
.vue-grid-item > .vue-delete-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  right: 0;
  cursor: pointer;
}
.vue-grid-item > .vue-delete-handle .iconfont {
  border: 1px solid #ccc;
  color: #a1a1a1;
}
.vue-grid-item > .vue-delete-handle .iconfont:hover {
  border: 1px solid #d1d1d1;
  color: #aaaaaa;
}
.vue-grid-item > .vue-delete-handle .iconfont:active {
  border: 1px solid #b8b8b8;
  color: #919191;
}
</style>