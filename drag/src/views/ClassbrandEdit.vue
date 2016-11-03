<template>
<div class="edit-page">
  <edit-header title="模块设置 - 智慧班级牌">
    <edit-header-btn bname="保存"></edit-header-btn>
  </edit-header>

  <edit-modules>
    <template v-for="item in 10">
      <edit-module
        icon="icon-iconfontzuoye"
        mname="作业">
      </edit-module>
    </template>
  </edit-modules>

  <edit-viewport>
    <grid-layout :minHeight="540" bgColor="#172044">
      <template v-for="(item, index) in layouts">

        <grid-item
          :key="item.data.cls"
          :containerWidth="960"
          :rowHeight="5.7"
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

  computed: {
    ...mapGetters({
      holder: 'getHolder',
      layouts: 'getLayouts',
    }),
  },

  methods: {
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
}
</style>