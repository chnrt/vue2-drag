<template>
<div class="module-wapper">
  <iframe :src="ifsrc" frameborder="0"></iframe>
  <div class="module-mask"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      ifsrc: 'http://manager.i3618.com.cn/classbrand-web/pages/classbrandBase.jsp',
    };
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