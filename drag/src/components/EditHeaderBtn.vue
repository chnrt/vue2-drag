<template>
<div class="edit-header-btn" @click="emitClick">{{ bname }}</div>
</template>

<script>
export default {
  props: {
    bname: {
      type: String,
      required: true,
    },
  },

  methods: {
    emitClick() {
      this.$emit('clickEvt');
    },
  },
};
</script>

<style>
.edit-header-btn {
  font-size: 14px;
  line-height: 28px;

  display: inline-block;

  height: 28px;
  margin-left: 10px;
  padding: 0 12px;

  cursor: pointer;

  border: 1px solid #fff;
  border-radius: 4px;
}
.edit-header-btn:hover {
  background-color: #fd722d;
}
.edit-header-btn:active {
  background-color: #f06620;
}
</style>