<template>
<div class="edit-header">
  <div class="edit-header-title">{{ title }}</div>

  <div class="edit-header-btns">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'edit-header',

  props: {
    title: {
      type: String,
      default: '模块设置',
    },
  },
};
</script>

<style>
.edit-header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  box-sizing: border-box;
  height: 55px;
  padding: 14px 30px 0;

  color: #fff;
  background-color: #fd6b22;
}
.edit-header-title {
  font-size: 18px;

  float: left;
}
.edit-header-btns {
  float: right;
}
</style>