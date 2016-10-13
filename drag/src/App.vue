<template>
<div>

  <grid-layout>

    <template v-for="(item, index) in layouts">
      <grid-item
        :index="index"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h">
      </grid-item>
    </template>

  </grid-layout>

</div>
</template>

<script>
import GridLayout from 'components/GridLayout';
import GridItem from 'components/GridItem';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',

  components: {
    GridLayout,
    GridItem,
  },

  data() {
    return {

    };
  },

  computed: {
    ...mapGetters({
      layouts: 'getLayouts',
    }),
  },

  methods: {
    ...mapActions([
      'addEL',
    ]),
  },
};
</script>

<style>
@import url('./assets/css/reset.css');
</style>
