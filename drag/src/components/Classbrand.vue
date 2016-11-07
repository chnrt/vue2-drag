<template>
<div class="module-wapper">
  <iframe ref="iframe" :src="srchash" frameborder="0"></iframe>
  <div class="module-mask"></div>

  <div class="module-loading" v-if="loading">
    <span class="ivu-spin-dot"></span>
  </div>
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

  data() {
    return {
      loading: true,
    };
  },

  computed: {
    srchash() {
      return `${this.ifsrc}#${this.fontSize}&${this.cls}&${Math.round(this.w)}&${Math.round(this.h)}`;
    },
  },

  mounted() {
    this.$refs.iframe.onload = () => {
      this.loading = false;
    };
  },
};
</script>

<style scoped>
.module-wapper,
.module-mask,
.module-loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.module-mask {
  background-color: #000;
  opacity: 0.1;
}
iframe {
  width: 100%;
  height: 100%;

  border: none;
}
@-webkit-keyframes ani-spin-bounce {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
            transform: scale(1);

    opacity: 0;
  }
}
@keyframes ani-spin-bounce {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
            transform: scale(1);

    opacity: 0;
  }
}

.ivu-spin-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  display: block;
  border-radius: 50%;
  background-color: #0099e5;
  width: 20px;
  height: 20px;
  -webkit-animation: ani-spin-bounce 1s 0s ease-in-out infinite;
  animation: ani-spin-bounce 1s 0s ease-in-out infinite;
}
</style>