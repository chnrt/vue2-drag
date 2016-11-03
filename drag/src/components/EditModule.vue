<template>
<div ref="item" class="edit-module">
  <i class="iconfont" v-if="icon" :class="icon"></i>
  <span class="edit-module-name">{{ mname }}</span>
  <i class="iconfont icon-jiahao"></i>
</div>
</template>

<script>
import interact from 'interact.js';

export default {
  name: 'edit-module',

  props: {
    icon: String,

    mname: {
      type: String,
      required: true,
    },
  },

  mounted() {
    interact(this.$refs.item)
      .draggable({})
      .on('dragmove', (event) => {
        this.dragMove(event);
      })
      .on('dragend', (event) => {
        this.dragEnd(event);
      });
  },
};
</script>

<style>
.edit-module {
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
</style>