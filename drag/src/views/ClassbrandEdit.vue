<template>
<div class="edit-page">
  <edit-header title="模块设置 - 智慧班级牌">
    <edit-header-btn bname="保存" @clickEvt="save"></edit-header-btn>
  </edit-header>

  <edit-modules>
    <template v-for="(item, index) in modules">
      <edit-module
        :key="item.data.cls"
        :index="index"
        :in="item.in"
        :moving="item.moving"
        :left="item.left"
        :top="item.top"
        :icon="item.data.icon"
        :mname="item.data.name"

        :maxX="maxX"
        :w="item.data.w"
        :h="item.data.h"
        :margin="margin"
        :col="colWidth"
        :row="rowHeight">
      </edit-module>
    </template>
  </edit-modules>

  <edit-viewport>
    <grid-layout :minHeight="vHeight" bgColor="#172044">
      <template v-for="(item, index) in layouts">

        <grid-item
          :key="item.data.cls"
          :containerWidth="vWidth"
          :rowHeight="rowHeight"
          :index="index"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h">

          <classbrand
            :w="item.w"
            :h="item.h"
            :cls="item.data.cls">
          </classbrand>
        </grid-item>

      </template>
    </grid-layout>
  </edit-viewport>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import EditHeader from 'components/EditHeader';
import EditHeaderBtn from 'components/EditHeaderBtn';
import EditModules from 'components/EditModules';
import EditModule from 'components/EditModule';
import EditViewport from 'components/EditViewport';
import GridLayout from 'components/GridLayout';
import GridItem from 'components/GridItem';
import Classbrand from 'components/Classbrand';

export default {
  name: 'classbrand-edit',

  components: {
    EditHeader,
    EditHeaderBtn,
    EditModules,
    EditModule,
    EditViewport,
    GridLayout,
    GridItem,
    Classbrand,
  },

  data() {
    return {
      vWidth: 960,
      vHeight: 540,
      margin: 5,
      maxX: 4,
      maxY: 50,

      moduleW: 1,
      moduleH: 20,
    };
  },

  computed: {
    colWidth() {
      return (this.vWidth - (this.margin * (this.maxX + 1))) / this.maxX;
    },

    rowHeight() {
      return (this.vHeight - (this.margin * (this.maxY + 1))) / this.maxY;
    },

    ...mapGetters({
      modules: 'getModules',
      holder: 'getHolder',
      layouts: 'getLayouts',
    }),
  },

  methods: {
    save() {
      console.log(this.layouts);
    },

    ...mapActions([
      'addEL',
      'updateAll',
    ]),
  },
};
</script>

<style>
.edit-page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  min-height: 600px;
  min-width: 1200px;
  overflow: hidden;
}
</style>