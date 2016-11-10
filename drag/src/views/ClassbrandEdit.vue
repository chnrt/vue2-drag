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

  <edit-viewport :split="true">
    <grid-layout :minHeight="vHeight" bgColor="inherit">
      <template v-for="(item, index) in layouts">

        <grid-item
          :key="item.data.cls"
          :spliceScreen="true"
          :containerWidth="vWidth"
          :containerHeight="vHeight"
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
import { Promise } from 'es6-promise';
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

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      Promise.all([
        this.$http.get('http://manager.i3618.com.cn/app/classbrand/moduleEdit/findConfigByOrgId?isDefault=false'),
        this.$http.get('http://manager.i3618.com.cn/app/classbrand/moduleEdit/findConfigByOrgId?isDefault=false&configType=setting'),
      ]).then((data) => {
        this.initConfig(data);
      }, (error) => {
        console.log(error);
      });
    },

    initConfig([currSetting, allModules]) {
      const { module_config } = currSetting.body.resultBean.configMap;
      const { module_setting_config } = allModules.body.resultBean.configMap;

      const clsArr = [];
      const layouts = [];
      const modules = [];
      const getModuleByCls = this.getModuleByCls();

      module_config.forEach((item) => {
        const cls = item.cls;
        const icon = item.icon || getModuleByCls(module_setting_config, cls).icon;
        const name = item.name || getModuleByCls(module_setting_config, cls).name;

        clsArr.push(cls);
        layouts.push({
          x: item.x || item.col - 1,
          y: item.y || item.row - 1,
          w: item.w || item.size_x,
          h: item.h || item.size_y,
          data: {
            cls,
            icon,
            name,
            w: item.w || item.size_x,
            h: item.h || item.size_y,
          },
        });
      });

      module_setting_config.forEach((item) => {
        if (clsArr.indexOf(item.cls) < 0) {
          modules.push({
            left: 0,
            top: 0,
            moving: false,
            in: false,
            data: item,
          });
        }
      });

      this.updateAll({ layouts });
      this.updateModules({ modules });
    },

    getModuleByCls() {
      const modulesByCls = {};
      return (modules, cls) => {
        if (modulesByCls[cls]) {
          return modulesByCls[cls];
        }

        modules.forEach((item) => {
          if (item.cls === cls) {
            modulesByCls[cls] = item;
            return false;
          }
          return true;
        });

        return modulesByCls[cls] || { icon: 'icon-qbyy', name: '未命名' };
      };
    },

    save() {
      window.parent.postMessage(this.layouts, location.origin); // eslint-disable-line
    },

    ...mapActions([
      'updateAll',
      'addAllModules',
      'updateModules',
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