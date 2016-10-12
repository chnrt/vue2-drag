<template>
<div>
  <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">订单管理</el-menu-item>
  </el-menu>
  <div class="line"></div>

  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="text">文字按钮</el-button>
</div>
</template>

<script>
export default {
  components: {
    // Button,
  },
};
</script>

<style>
@import url('./assets/css/reset.css');
</style>
