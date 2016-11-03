<template>
<div class="edit-modules">
  <div class="edit-modules-title">
    <i class="iconfont icon-qbyy"></i>&nbsp;模块列表
  </div>
  <div class="edit-modules-btns">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {

};
</script>

<style>
.edit-modules {
  position: absolute;
  top: 55px;
  bottom: 0;
  left: 0;
  width: 140px;
  background-color: #f8f9fc;
  border-right: 1px solid #e7e7e7;
  color: #666;
}
.edit-modules-title {
  padding: 10px;
  height: 15px;
  font-size: 14px;
  border-bottom: 1px solid #e7e7e7;
  line-height: 1;
}
.edit-modules-title .iconfont {
  font-size: 14px;
}
.edit-modules-btns {
  position: absolute;
  top: 35px;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
}
.edit-modules-btns::-webkit-scrollbar {
  width: 0;
}
</style>