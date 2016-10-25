<template>

<div
  ref="item"
  class="vue-grid-item"
  :class="{ 'vue-draggable-dragging': isDraging }"
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
import interact from 'interact.js';
import { mapGetters, mapActions } from 'vuex';
import { compact, moveElement } from '../api/utils';

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
      maxRows: 999,

      isDraging: false,
      isResizable: false,
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
          i: this.layouts[this.index].i,
        },
      });
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

        const layouts = [].concat(this.layouts);
        const w = Math.max(0, Math.round(this.w + (gw / this.colWidth)));
        const h = Math.max(0, Math.round(this.h + (gh / this.rowHeight)));

        const holder = layouts[this.index] =
          { x: this.x, y: this.y, w, h, i: layouts[this.index].i };
        compact(layouts, true);

        layouts[this.index] = {
          x: this.x,
          y: this.y,
          w: Math.max(0, this.w + (gw / this.colWidth)),
          h: Math.max(0, this.h + (gh / this.rowHeight)),
          i: layouts[this.index].i,
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
          i: newLayouts[this.index].i,
        };

        this.updateAll({ layouts: newLayouts });
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
      x = Math.max(x, 0);
      y = Math.max(y, 0);

      return { x, y };
    },

    ...mapActions([
      'changeStatus',
      'updateHolder',
      'updateLayout',
      'updateAll',
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
  box-shadow: 10px 10px 40px #444;
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
</style>