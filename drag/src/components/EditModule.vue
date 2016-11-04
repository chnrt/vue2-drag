<template>
<div ref="item" class="edit-module" :class="cls" :style="stl">

  <i class="iconfont"
    v-if="icon"
    :class="icon"
    :style="inStyle">
  </i>
  <span class="edit-module-name">{{ mname }}</span>

  <i class="iconfont icon-jiahao"></i>
</div>
</template>

<script>
import interact from 'interact.js';
import { mapGetters, mapActions } from 'vuex';
import { moveElement, compact, getElementClientRect } from '../api/utils';

export default {
  name: 'edit-module',

  props: {
    index: Number,
    moving: Boolean,
    in: Boolean,
    left: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },

    icon: String,
    mname: {
      type: String,
      required: true,
    },

    w: Number,
    h: Number,
    col: Number,
    row: Number,
    margin: Number,
    width: Number,
    height: Number,
  },

  data() {
    return {
      dX: 0,
      dY: 0,

      rect: { left: 0, top: 0 },

      // 当前模块在vieport外面
      out: true,
    };
  },

  computed: {
    rectLeft() {
      return this.rect.left + this.left;
    },

    rectTop() {
      return this.rect.top + this.top;
    },

    x() {
      return (this.rectLeft - this.layoutsRect.left) / (this.col + this.margin);
    },

    y() {
      return (this.rectTop - this.layoutsRect.top) / (this.row + this.margin);
    },

    cls() {
      return {
        'ismove-left': this.moving && !this.in,
        'ismove-right': this.moving && this.in,
      };
    },

    stl() {
      const translate = `translate(${this.left}px,${this.top}px)`;
      const style = {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
      };

      if (this.in) {
        style.paddingLeft = '0px';
        style.textAlign = 'center';
        style.width = `${this.width}px`;
        style.height = `${this.height}px`;
      }

      return style;
    },

    inStyle() {
      let style = {};
      if (this.in) {
        style = {
          display: 'block',
          fontSize: `${this.height / 2}px`,
          lineHeight: `${this.height / 2}px`,
        };
      }

      return style;
    },

    module() {
      return this.moduels[this.index];
    },

    ...mapGetters({
      moduels: 'getModules',
      holder: 'getHolder',
      layouts: 'getLayouts',
      layoutsRect: 'getLayoutsRect',
    }),
  },

  mounted() {
    interact(this.$refs.item)
      .draggable({})
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
    dragStart(e) {
      e.preventDefault();
      this.dX = e.clientX - this.left;
      this.dY = e.clientY - this.top;

      this.moveModule({
        index: this.index,
        module: { moving: true },
      });

      this.rect = getElementClientRect(this.$refs.item);
    },

    dragMove(e) {
      if (this.moving) {
        const top = e.clientY - this.dY;
        const left = e.clientX - this.dX;

        this.moveModule({
          index: this.index,
          module: { top, left },
        });

        this.feedback();
      }
    },

    /**
     * 模块移动到viewport区域，对其内容造成影响
     */
    feedback() {
      if (this.in) {
        this.out = false;
        const w = this.w;
        const h = this.h;
        let x = Math.round(this.x);
        let y = Math.round(this.y);

        x = Math.min(Math.max(x, 0), 3); // TODO 3暂时写死
        y = Math.max(y, 0);

        const layouts = [].concat(this.layouts);
        layouts.push({ x, y, w, h });

        const newLayouts = moveElement(layouts, layouts[layouts.length - 1], x, y, true);
        compact(newLayouts, true);

        const holder = newLayouts.pop();
        this.updateAll({ layouts: newLayouts });
        this.changeStatus({ status: true });
        this.updateHolder({
          holder: {
            index: -1,
            x: holder.x,
            y: holder.y,
            w,
            h,
            left: Math.round((this.col * holder.x) + ((holder.x + 1) * this.margin)),
            top: Math.round((this.row * holder.y) + ((holder.y + 1) * this.margin)),
            width: this.width,
            height: this.height,
          },
        });
      } else if (!this.out) {
        this.out = true;
        this.changeStatus({ status: false });
        const layouts = [].concat(this.layouts);
        compact(layouts, true);
        this.updateAll({ layouts });
      }
    },

    dragEnd() {
      // 没有移动到viewport中，自动弹回到原位置
      if (!this.in) {
        this.moveModule({
          index: this.index,
          module: { moving: false, top: 0, left: 0 },
        });
      } else {
        const data = this.module.data;
        const { x, y, w, h } = this.holder;

        this.addEL({
          layout: { x, y, w, h, data },
        });
        this.removeModule({ index: this.index });
      }
    },

    ...mapActions([
      'moveModule',
      'removeModule',
      'changeStatus',
      'updateHolder',
      'updateAll',
      'addEL',
    ]),
  },
};
</script>

<style>
.edit-module {
  position: relative;
  box-sizing: border-box;
  width: 120px;
  height: 30px;
  margin: 10px 10px 0;
  border: 1px solid #cbcbcb;
  background-color: #fff;
  padding-left: 5px;
  line-height: 26px;
  font-size: 12px;
  color: #ababab;
}
.edit-module:last-child {
  margin-bottom: 10px;
}
.edit-module .icon-jiahao{
  float: right;
  margin-right: 5px;
  font-size: 13px;
}
.edit-module.ismove-left,
.edit-module.ismove-right {
  border: 1px dashed #cbcbcb;
  z-index: 1;
  box-shadow: 1px 1px 5px #ddd;
}
.edit-module.ismove-right .icon-jiahao,
.edit-module.ismove-left .icon-jiahao {
  display: none;
}
</style>