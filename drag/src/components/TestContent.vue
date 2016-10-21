<template>
  <div :style="styles">
    模块{{content}}
  </div>
</template>

<script>
export default {
  name: 'test-content',

  props: ['content'],

  computed: {
    styles() {
      return {
        'background-color': `#${this.content * 3}00`,
      };
    },
  },
};
</script>

<style scoped>
div {
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: #f3f3f3; */
  color: #fff;
  text-align: center;
  padding-top: 20px;
}
</style>