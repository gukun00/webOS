/*
 * @Author: guk 
 * @Date: 2019-07-09 17:18:20 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-09 19:07:12
 * 菜单组件
 */
<template>
  <div
    v-if="contextMenuInfo.isShow"
    class="app-context-menu"
    :style="contextMenuStyle"
    @click.stop.prevent
  >
    <!-- FIXME 可以考虑自定义菜单的实现 -->
    <template v-for="item in contextMenuInfo.list">
      <ContextMenuItem :info="item" v-if="Object.keys(item).length" :key="item.name">
        <div
          v-if="item.children && item.children.length"
          class="context-menu-child"
          :style="item.childrenStyle"
          slot="child"
        >
          <ContextMenuItem
            v-for="childItem in item.children"
            :info="childItem"
            :key="childItem.name"
          ></ContextMenuItem>
        </div>
      </ContextMenuItem>
    </template>
  </div>
</template>

<script>
import ContextMenuItem from "./ContextMenuItem.vue";
import { mapState } from "vuex";

export default {
  name: "ContextMenu",
  components: {
    ContextMenuItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      contextMenuInfo: state => state.rightMenu.contextMenuInfo
    }),
    contextMenuStyle: function() {
      let _t = this;
      let x =
        _t.contextMenuInfo.x !== undefined
          ? parseInt(_t.contextMenuInfo.x) > 0
            ? parseInt(_t.contextMenuInfo.x)
            : 0
          : 0;
      let y =
        _t.contextMenuInfo.y !== undefined
          ? parseInt(_t.contextMenuInfo.y) > 0
            ? parseInt(_t.contextMenuInfo.y)
            : 0
          : 0;
      let tmpObj = {};
      // 判断是否超出边界
      if (
        document.documentElement &&
        document.documentElement.clientHeight &&
        document.documentElement.clientWidth
      ) {
        let winHeight = document.documentElement.clientHeight;
        let winWidth = document.documentElement.clientWidth;
        if (x + 200 > winWidth) {
          tmpObj["right"] = "10px";
        } else {
          tmpObj["left"] = x + "px";
        }
        if (y + 100 > winHeight) {
          tmpObj["bottom"] = "42px";
        } else {
          tmpObj["top"] = y + "px";
        }
      }
      return tmpObj;
    }
  },
  created: function() {
 
  },
  beforeDestroy: function() {}
};
</script>

<style lang="less" rel="stylesheet/less">
.app-context-menu {
  position: absolute;
  min-width: 120px;
  width: auto !important;
  z-index: 9999;
  background: #fff;
  box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.1);
  padding: 5px 0;

  .context-menu-item {
    padding: 5px 10px 5px 40px;
    position: relative;
    cursor: default;
    /*border: 1px solid transparent;*/
    border-left: none;
    border-right: none;

    &:before {
      content: " ";
      display: inline-block;
      position: absolute;
      top: 0;
      left: 30px;
      bottom: 0;
      width: 1px;
      background-color: #f5f7f9;
    }
    &:hover {
      background: #f0f0f0;
      /*border-color: #57a3f3;*/
      /*box-shadow: 0 0 2px 2px rgba(45, 140, 240, .2);*/

      .context-menu-child {
        display: inline-block;
      }

      > .context-menu-icon {
        transform: rotate(360deg);
        transform-origin: center center;
      }
    }
    > .context-menu-icon {
      position: absolute;
      top: 10px;
      left: 10px;
      transition: all 0.2s ease-in-out;
    }
    .context-menu-label {
      display: inline-block;
      position: relative;
      width: 100%;

      .context-menu-label-text {
        display: inline-block;
      }
      .context-menu-icon-child {
        display: inline-block;
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -0.5em;
      }
    }
    .context-menu-child {
      position: absolute;
      z-index: 1;
      display: none;
      background: #fff;
      right: 0;
      top: 0;
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
      padding: 5px 0;
    }
  }
}
</style>
