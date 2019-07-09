/*
 * @Author: guk 
 * @Date: 2019-07-09 17:17:40 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-09 20:23:18
 * 菜单项组件
 */

<template>
  <div
    class="context-menu-item"
    :name="info.name"
    :style="info.style"
    @click.stop="triggerMenuItem"
  >
    <span class="context-menu-icon" style="line-height:10px">
      <i v-if="info.icon" :class="[info.icon.class]" :style="info.icon.style"></i>
    </span>

    <div class="context-menu-label">
      <div class="context-menu-label-text">{{ info.text }}</div>
      <Icon
        class="context-menu-icon-child"
        v-if="info.children && info.children.length"
        type="arrow-right-b"
      ></Icon>
    </div>

    <slot name="child"></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ContextMenuItem",
  computed: {},
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 触发菜单 FIXME 可以考虑点击时判断是否有子菜单，有子菜单则打开子菜单
    triggerMenuItem: function() {
       this.info.action.handler();
       this.$store.commit("toggleRightMenu",false);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>