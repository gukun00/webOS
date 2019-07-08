/*
 * @Author: guk 
 * @Date: 2019-07-08 10:45:24 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-08 17:05:20
 * 这是桌面
 */


<template>
  <div class="app-desktop">
    <div class="app-desktop-box" @drop.stop.prevent="handleDrop" @dragover.stop.prevent>
      <!-- <DesktopIcon
        v-for="(item, index) in appData_installed.iconList"
        :key="'desktop_icon_' + index"
        :info="item"
        :showTitle="appData_installed.showTitle"
        :style="item.config.desktopIcon.style"
      ></DesktopIcon>
      <Window
        v-for="(item, index) in openedWindowList"
        :key="'window_' + index"
        :info="item"
      ></Window> -->
      <Wallpaper  switchType="win7" :style="{ 'z-index': 1000 }"></Wallpaper>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Wallpaper from "./Wallpaper"

export default {
  name: "Desktop",
  components: {
      Wallpaper
    },
  props: {
    
  },
  data() {
    return {
      gridArr: [],
      // 每个图标宽高80px margin 10px
      itemWidthHeight: 100,
      directionArr: [
        "top-bottom-left-right",
        "top-bottom-right-left",
        "bottom-top-left-right",
        "bottom-top-right-left",
        "left-right-top-bottom",
        "left-right-bottom-top",
        "right-left-top-bottom",
        "right-left-bottom-top"
      ],
      // 当前激活的排序方向
      currentDirection: "top-bottom-left-right",
      // 通过行内样式控制
      windowStyleBySize: {
        small: {
          width: "300px",
          height: "200px",
          left: "calc(50% - 150px)",
          top: "calc(50% - 100px)"
        },
        middle: {
          width: "800px",
          height: "600px",
          left: "calc(50% - 400px)",
          top: "calc(50% - 300px)"
        },
        max: {
          // width: 'auto',
          // height: 'auto',
          width: "calc(100%)",
          height: "calc(100% - 40px)",
          left: 0,
          top: 0
        },
        full: {
          width: "calc(100%)",
          height: "100%",
          left: 0,
          top: 0
        },
        min: {
          width: 0,
          height: 0,
          top: "100%"
        },
        custom: {}
      },
      // 预览样式
      previewStyle: {
        "z-index": "-1",
        position: "absolute",
        display: "inline-block",
        left: "50%",
        top: "50%",
        width: "800px",
        height: "600px",
        "margin-left": "-400px",
        "margin-top": "-300px"
      }
    };
  },
  computed: {
    ...mapState("Platform/Admin", {
      _appData: state => state._appData
    }),
    appData_installed : function(){
      //过滤得到已经安装的app
      let installed = [];
      ths._appData.forEach(element => {
        if(element.action === "installed"){
          installed.push(element);
        } 
      });
      return installed;
    }
  },
  methods: {},
  created: function() {
    // let _t = this
    // // 处理格子排序
    // _t.handleGridLayout(_t.currentDirection)
    // // 初始化渲染
    // _t.$utils.bus.$on('platform/desktopIcon/render', function () {
    //   // 处理格子排序
    //   _t.handleGridLayout(_t.currentDirection)
    // })
    // // 监听事件
    // _t.$utils.bus.$on('platform/desktopIcon/sort', function (direction) {
    //   if (_t.directionArr.includes(direction)) {
    //     // 处理格子排序
    //     _t.handleGridLayout(direction)
    //   }
    // })
    // // 监听 window 操作
    // _t.$utils.bus.$on('platform/window/trigger', function (tmpInfo) {
    //   _t.handleWindowTrigger(tmpInfo)
    // })
    // // 监听 window 分屏显示
    // _t.$utils.bus.$on('platform/window/splitScreen/show', function (tmpInfo) {
    //   _t.handleSplitScreen(tmpInfo)
    // })
    // // 监听应用安装
    // _t.$utils.bus.$on('platform/application/install', function (tmpInfo) {
    //   _t.handleAppInstallOrUninstall(tmpInfo)
    // })
    // // 监听应用卸载
    // _t.$utils.bus.$on('platform/application/uninstall', function (tmpInfo) {
    //   _t.handleAppInstallOrUninstall(tmpInfo)
    // })
    // let resizeTimer = null
    // // 监听窗口大小调整
    // window.onresize = () => {
    //   return (() => {
    //     if (resizeTimer) {
    //       clearTimeout(resizeTimer)
    //     }
    //     resizeTimer = setTimeout(function () {
    //       console.log('window resize!')
    //       // 处理格子排序
    //       _t.handleGridLayout(_t.currentDirection)
    //     }, 500)
    //   })()
    // }
  },
  beforeDestroy: function() {}
};
</script>


<style scoped lang="less" rel="stylesheet/less">
.app-desktop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .app-desktop-box {
    display: inline-block;
    /*position: relative;*/
    width: 100%;
    height: 100%;
    writing-mode: vertical-lr;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2000;
  }
}
</style>
