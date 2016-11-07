<template>
<div class="module-wapper">
  <iframe :src="srchash" frameborder="0"></iframe>
  <div class="module-mask"></div>
</div>
</template>

<script>
export default {
  name: 'classbrand',

  props: {
    w: {
      type: Number,
      required: true,
    },

    h: {
      type: Number,
      required: true,
    },

    ifsrc: {
      type: String,
      default: 'http://manager.i3618.com.cn/classbrand-web/pages/module.jsp',
    },

    cls: {
      type: String,
      default: 'classbrand-base',
    },

    fontSize: {
      type: Number,
      default: 20,
    },
  },

  computed: {
    srchash() {
      return `${this.ifsrc}#${this.fontSize}&${this.cls}&${Math.round(this.w)}&${Math.round(this.h)}`;
    },
  },
};
</script>

<style scoped>
.module-wapper,
.module-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

iframe {
  width: 100%;
  height: 100%;

  border: none;
}
</style>