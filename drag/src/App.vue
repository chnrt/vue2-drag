<template>
<div>
  <div class="page-container">
    <el-row>
      <el-col :span="4">
        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo" theme="dark"  @select="addModule">
          <el-menu-item-group title="点击添加">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              模块一
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              模块二
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              模块三
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-menu"></i>
              模块四
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>

      <el-col :span="20">
        <grid-layout>

          <template v-for="(item, index) in layouts">
            <grid-item
              :index="index"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h">

              <classbrand></classbrand>

            </grid-item>
          </template>

        </grid-layout>
      </el-col>
    </el-row>
  </div>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import GridLayout from 'components/GridLayout';
import GridItem from 'components/GridItem';
import TestContent from 'components/TestContent';
import Classbrand from 'components/Classbrand';

import { compact } from './api/utils';

export default {
  name: 'app',

  components: {
    GridLayout,
    GridItem,
    TestContent,
    Classbrand,
  },

  data() {
    return {

    };
  },

  computed: {
    ...mapGetters({
      holder: 'getHolder',
      layouts: 'getLayouts',
    }),
  },

  methods: {
    addModule(index) {
      let y = 0;
      this.layouts.forEach((item) => {
        if (item.x === 0) {
          y = Math.max(y, item.y + item.h);
        }
      });

      this.addEL({
        layout: { x: 0, y, w: Math.min(2, index), h: Math.max(3, index), i: index },
      });

      const layouts = [].concat(this.layouts);
      compact(layouts, true);
      this.updateAll({ layouts });
    },

    ...mapActions([
      'addEL',
      'updateAll',
    ]),
  },
};
</script>

<style>
@import url('./assets/css/reset.css');

.container, .page-container {
  width: 100%;
  background-color: #324057;
}

</style>
