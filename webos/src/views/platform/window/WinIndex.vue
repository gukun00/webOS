/*
 * @Author: guk 
 * @Date: 2019-07-10 17:44:46 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-17 11:13:58
 * 
 */


<template>
  <div
    class="app-window"
    :class="windowSizeClass"
    @mousedown="onWindowMouseDown"
    :window-name="info.appInfo.appName || info.appInfo.config.app.name"
    v-x-drag="dragResizeConfig"
  >
    <!-- 拖拽缩放 -->
    <div v-if="enableResizeHandler('top-left')" v-show="dragResizeConfig.resize.enable" class="app-window-resize resize-top-left"></div>
    <div v-if="enableResizeHandler('top-right')" v-show="dragResizeConfig.resize.enable" class="app-window-resize resize-top-right"></div>
    <div v-if="enableResizeHandler('bottom-left')" v-show="dragResizeConfig.resize.enable" class="app-window-resize resize-bottom-left"></div>
    <div v-if="enableResizeHandler('bottom-right')" v-show="dragResizeConfig.resize.enable" class="app-window-resize resize-bottom-right"></div>
    <div v-if="enableResizeHandler('top-border')" v-show="dragResizeConfig.resize.enable" class="app-window-resize resize-top-border"></div>
    <div v-if="enableResizeHandler('right-border')" v-show="dragResizeConfig.resize.enable" class="app-window-resize resize-right-border"></div>
    <div v-if="enableResizeHandler('bottom-border')" v-show="dragResizeConfig.resize.enable" class="app-window-resize resize-bottom-border"></div>
    <div v-if="enableResizeHandler('left-border')" v-show="dragResizeConfig.resize.enable" class="app-window-resize resize-left-border"></div>
    <!-- <WallpaperBackground></WallpaperBackground> -->
    <div class="app-window-header" :class="{'header-show':isHeadShow}">
      <!--
      // FIXME 测试header自定义功能
      v-if="!(info.config.window.header && !info.config.window.header.enable)"
      -->
      <div
        class="window-title"
        @mousedown.stop="onWindowMouseDown"
        @dblclick.stop.prevent="handleWindowSize(info.config.window.size === 'max' ? 'reset' : 'max')"
      >
        {{ info.appInfo.hasOwnProperty('action') ? (info.appInfo.action === 'install' ? '安装：' : (info.appInfo.action === 'uninstall' ? '卸载：' : '')) : '' }}
        {{ info.appInfo.appTitle || info.appInfo.config.app.title }}
      </div>
      <div class="window-bar">
        <!-- 最小化 -->
        <div
          v-if="info.window.enableResize.includes('min')"
          class="window-bar-item"
          @mousedown.stop
          @mousemove.stop
          @mouseup.stop
          @click.stop.prevent="handleWindowSize('min')"
        >
          <!-- <Icon type="ios-remove" /> -->
          <i class="icon iconfont icon-minus"></i>
        </div>
        <!-- 最大化 -->
        <div
          v-if="info.window.enableResize.includes('max') && info.window.size !== 'max'"
          class="window-bar-item"
          @mousedown.stop
          @mousemove.stop
          @mouseup.stop
          @click.stop.prevent="handleWindowSize('max')"
        >
          <!-- <Icon type="md-square-outline" /> -->
          <i class="icon iconfont icon-fullscreen"></i>
        </div>
        <!-- 还原 -->
        <div
          v-if="info.window.enableResize.includes('reset') && info.window.size === 'max'"
          class="window-bar-item"
          @mousedown.stop
          @mousemove.stop
          @mouseup.stop
          @click.stop.prevent="handleWindowSize('reset')"
        >
          <i class="icon iconfont icon-fullscreen-exit"></i>
        </div>
        <!-- 全屏 -->
        <div
          class="window-bar-item"
          @mousedown.stop
          @mousemove.stop
          @mouseup.stop
          @click.stop.prevent="setFullSreen"
        >
          <i class="icon iconfont icon-arrawsalt"></i>
        </div>
        <!-- 关闭 -->
        <div
          v-if="info.window.enableResize.includes('close')"
          class="window-bar-item"
          @mousedown.stop
          @mousemove.stop
          @mouseup.stop
          @click.stop.prevent="handleWindowSize('close')"
        >
          <i class="icon iconfont icon-close"></i>
        </div>
      </div>
    </div>
    <div class="app-window-body" :class="{maximum: isFullscreen}">
      <div class="window-body-hide" v-show="isFullscreen" @mouseenter="showheader"></div>
      <div
        v-show="isExit"
        class="window-bar-hide"
        @mousedown.stop
        @mouseup.stop
        @click.stop
        @mouseleave="hideExit"
      >
        <!-- 最小化 -->
        <div class="window-bar-item" @mousedown.stop @mousemove.stop @mouseup.stop>
          <i class="icon iconfont icon-minus" @click.stop.prevent="exitFullScreen('min')"></i>
        </div>
        <!-- 还原 -->
        <div class="window-bar-item" @mousedown.stop @mousemove.stop @mouseup.stop>
          <i
            class="icon iconfont icon-fullscreen-exit"
            @click.stop.prevent="exitFullScreen('reset')"
          ></i>
        </div>
        <!-- 退出全屏 -->
        <div class="window-bar-item" @mousedown.stop @mousemove.stop @mouseup.stop>
          <i class="icon iconfont icon-shrink" @click.stop.prevent="exitFullScreen('restore')"></i>
        </div>
        <!-- 关闭 -->
        <div class="window-bar-item" @mousedown.stop @mousemove.stop @mouseup.stop>
          <i class="icon iconfont icon-close" @click.stop.prevent="exitFullScreen('close')"></i>
        </div>
      </div>

      <WinModal v-if="info.window.type && info.window.type === 'modal'" :info="info"></WinModal>
      <WinIFrame v-if="info.window.type && info.window.type === 'iframe'" :info="info"></WinIFrame>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WinIFrame from "./WinIFrame.vue";
import WinModal from "./WinModal.vue";
import WallpaperBackground from "@/components/public/WallpaperBackground";

import { handleResizeByWindowBar } from "../js/handleWindowSize";
export default {
  name: "WinIndex",
  components: {
    WinIFrame,
    WinModal,
    WallpaperBackground
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    let _t = this;
    return {
      // 拖拽缩放默认配置
      defDragResizeConfig: {
        // 上下文，如需广播事件则必须
        context: _t,
        // 拖拽配置
        drag: {
          // 是否启用拖拽
          enable: true,
          // 指定拖拽把手元素，支持一个或多个把手
          handler: [".window-title"],
          // 拖拽不同阶段 className
          class: {
            start: "x-drag-start",
            move: "x-drag-move",
            done: "x-drag-done",
            main: "x-drag"
          },
          // 回调
          callback: {
            start: null,
            move: _t.handleDragMove,
            done: _t.handleDragResizeDone
          }
        },
        // 缩放配置
        resize: {
          // 是否启用缩放
          enable: true,
          // 指定缩放把手元素，支持一个或多个把手
          handler: {
            // FIXME 支持自定义缩放handler，如果不启用则值给 false，如果启用则值给 具体的class名称
            "top-left": ".resize-top-left",
            "top-right": ".resize-top-right",
            "bottom-left": ".resize-bottom-left",
            "bottom-right": ".resize-bottom-right",
            "top-border": ".resize-top-border",
            "right-border": ".resize-right-border",
            "bottom-border": ".resize-bottom-border",
            "left-border": ".resize-left-border"
          },
          // 缩放不同阶段 className
          class: {
            start: "x-resize-start",
            move: "x-resize-move",
            done: "x-resize-done",
            main: "x-resize"
          },
          // 回调
          callback: {
            start: null,
            move: _t.handleResizeMove,
            done: _t.handleDragResizeDone
          }
        },
        // 范围
        range: () => {
          return {
            minX: 0,
            maxX: document.body.clientWidth,
            minY: 0,
            maxY: document.body.clientHeight - 60,
            // 间距5px
            margin: 5
          };
        }
      },
      splitScreen: {
        enable: false,
        // 分屏模式
        type: ""
      },
      isMaximum: false,
      headTrigger: false,
      isFullscreen: false,
      isExit: false,
      isHeadShow: false
    };
  },
  computed: {
    windowSizeClass: function() {
      let tmpClassName = "";
      switch (this.info.window.size) {
        case "custom":
          tmpClassName = "app-window-custom";
          break;
        case "small":
          tmpClassName = "app-window-small";
          break;
        case "middle":
          tmpClassName = "app-window-middle";
          break;
        case "min":
          tmpClassName = "app-window-min";
          break;
        case "max":
          tmpClassName = "app-window-max";
          break;
      }
      return tmpClassName;
    },
    // 拖拽缩放配置
    dragResizeConfig: function() {
      return this.handleDragResizeConfig();
    }
    // ,
    // appInfo() {
    //   return this.info ? this.info.appInfo : null;
    // }
  },
  created() {},
  methods: {
    // 处理窗口拖拽缩放配置
    handleDragResizeConfig: function() {
      // 当前应用的拖拽缩放配置
      let appDragResizeConfig = this.info.window.hasOwnProperty(
        "dragResizeConfig"
      )
        ? this.info.window.dragResizeConfig
        : {};
      // 合并配置，遇到对象则合并，其他覆盖
      let handler = function(source, target) {
        let keys = Object.keys(source);
        // 1.判断源对象是否需要处理
        if (keys.length) {
          keys.map(key => {
            // 源属性
            let item = source[key];
            // 1.1.target是否存在该属性，有则做处理，无则跳过
            let flag = target.hasOwnProperty(key);
            if (flag) {
              // 1.1.1.判断类型是否相等，同类型才可以执行覆盖
              if (typeof item === typeof target[key]) {
                // 1.2.不是对象则覆盖、是数组则覆盖
                if (
                  typeof item !== "object" ||
                  (typeof item === "object" && item instanceof Array)
                ) {
                  source[key] = target[key];
                  // 1.3.是对象则递归处理
                } else if (
                  typeof item === "object" &&
                  typeof target === "object"
                ) {
                  source[key] = handler(item, target[key]);
                }
              }
            }
          });
        }
        return source;
      };
      let tmpObj = handler(this.defDragResizeConfig, appDragResizeConfig);
      if (this.info.window.size === "max") {
        //最大化的时候不能移动不能drag
        tmpObj.drag.enable = false;
        tmpObj.resize.enable = false;
      } else {
        tmpObj.drag.enable = true;
        tmpObj.resize.enable = true;
      }
      console.log(tmpObj, "tmpObj");
      return tmpObj;
    },
    // 处理缩放handler
    enableResizeHandler: function(direction) {
      let flag = false;
      if (
        this.dragResizeConfig &&
        //this.dragResizeConfig.resize.enable &&
        this.dragResizeConfig.resize.handler
      ) {
        flag = !!this.dragResizeConfig.resize.handler[direction];
      }
      //flag = false;
      return flag;
    },
    // 处理弹窗状态
    handleWindowSize: function(actionName = "close") {
      // 如果未启用相应则返回
      if (!this.info.window.enableResize.includes(actionName)) {
        return false;
      }

      handleResizeByWindowBar(
        {
          winInfo: this.info,
          action: actionName
        },
        data => {
          this.$store.commit("updateOneWindow", {
            key: this.info.key,
            window: data.window
          });
        }
      );
    },
    onWindowMouseDown: function() {
      //调整窗口位置
      this.$store.commit("setToFront",this.info)
    },
    // 拖拽中回调
    handleDragMove: function(style, mousePosition, range) {
      let splitScreen = {
        enable: true,
        // 分屏模式
        type: "",
        mousePosition,
        range
      };
      let isFullscreen = false;
      let minX = range.minX + range.margin;
      let maxX = range.maxX - range.margin;
      let minY = range.minY + range.margin;
      let maxY = range.maxY - range.margin;
      if (mousePosition.x <= minX && mousePosition.y <= minY) {
        splitScreen.type = "left-top";
      } else if (mousePosition.x <= minX && mousePosition.y >= maxY) {
        splitScreen.type = "left-bottom";
      } else if (mousePosition.x >= maxX && mousePosition.y <= minY) {
        splitScreen.type = "right-top";
      } else if (mousePosition.x >= maxX && mousePosition.y >= maxY) {
        splitScreen.type = "right-bottom";
      } else if (mousePosition.x <= minX) {
        splitScreen.type = "left";
      } else if (mousePosition.x >= maxX) {
        splitScreen.type = "right";
      } else if (mousePosition.y <= minY) {
        splitScreen.type = "full-screen";
        isFullscreen = true;
      } else {
        splitScreen.enable = false;
      }
      this.splitScreen = splitScreen;
    },
    // 缩放中回调
    handleResizeMove: function(style, mousePosition, range) {
      let splitScreen = {
        enable: true,
        // 分屏模式
        type: "",
        mousePosition,
        range,
        style: {
          ...this.info.window["style"]
        }
      };
      // let minX = range.minX + range.margin
      // let maxX = range.maxX - range.margin
      let minY = range.minY + range.margin;
      let maxY = range.maxY - range.margin;
      if (mousePosition.y <= minY) {
        splitScreen.type = "top";
      } else if (mousePosition.y >= maxY) {
        splitScreen.type = "bottom";
      } else {
        splitScreen.enable = false;
      }
      this.splitScreen = splitScreen;
    },
    // 拖拽完成回调
    handleDragResizeDone: function(style) {
      console.log(style)
      // 分发mutations，更新窗口样式
      let bodyWidth = document.body.clientWidth;
      let bodyHeight = document.body.clientHeight - 40;
      let splitScreenStyle = {};
      if (this.splitScreen.enable && this.splitScreen.type) {
        switch (this.splitScreen.type) {
          case "left-top":
            splitScreenStyle = {
              top: 0,
              left: 0,
              width: bodyWidth / 2 + "px",
              height: bodyHeight / 2 + "px"
            };
            break;
          case "left-bottom":
            splitScreenStyle = {
              top: bodyHeight / 2 + "px",
              left: 0,
              width: bodyWidth / 2 + "px",
              height: bodyHeight / 2 + "px"
            };
            break;
          case "right-top":
            splitScreenStyle = {
              top: 0,
              left: bodyWidth / 2 + "px",
              width: bodyWidth / 2 + "px",
              height: bodyHeight / 2 + "px"
            };
            break;
          case "right-bottom":
            splitScreenStyle = {
              top: bodyHeight / 2 + "px",
              left: bodyWidth / 2 + "px",
              width: bodyWidth / 2 + "px",
              height: bodyHeight / 2 + "px"
            };
            break;
          case "left":
            splitScreenStyle = {
              top: 0,
              left: 0,
              width: bodyWidth / 2 + "px",
              height: bodyHeight + "px"
            };
            break;
          case "right":
            splitScreenStyle = {
              top: 0,
              left: bodyWidth / 2 + "px",
              width: bodyWidth / 2 + "px",
              height: bodyHeight + "px"
            };
            break;
          case "top":
          case "bottom":
            splitScreenStyle = {
              top: 0,
              height: bodyHeight + "px"
            };
            break;
          case "full-screen":
            splitScreenStyle = {
              top: 0,
              left: 0,
              width: bodyWidth + "px",
              height: bodyHeight + "px"
            };
            // info.window.size = 'max';
            this.handleWindowSize("max");
            return;
        }
        // info.window.oldSize = info.window.size;
        // info.window.oldStyle = info.window.style;
      }

      let tempStyleInfo = {
        ...this.info.window["style"],
        ...style,
        ...splitScreenStyle
      };

      console.log(this.info.window,"this.info.window")

      this.$store.commit("updateOneWindowStyle", {
        info: this.info,
        style: tempStyleInfo
      });

      // 广播事件 触发window事件
      // this.$utils.bus.$emit("platform/window/trigger", {
      //   // 通过XDrag控制窗口拖拽、缩放
      //   action: "dragResize",
      //   data: {
      //     appInfo: appInfo
      //   }
      // });

      // 广播事件 触发splitScreen隐藏事件
      //this.$utils.bus.$emit("platform/window/splitScreen/hide");
    },
    setFullSreen() {
      this.isFullscreen = true;
      if (!this.info.window.enableResize.includes("full")) {
        this.info.window.enableResize.push("full");
      }
      this.handleWindowSize("full");
      // this.info.window["style"] = {
      //   ...this.info.window["style"],
      //   height: "100%"
      // };
      // this.$utils.bus.$emit("platform/window/taskBar/hide");
    },
    exitFullScreen(action) {
      this.isFullscreen = false;
      this.isExit = false;
      //this.$utils.bus.$emit("platform/window/taskBar/show");
      if (!this.info.window.enableResize.includes("restore")) {
        this.info.window.enableResize.push("restore");
      }
      if (typeof action == "string") {
        this.handleWindowSize(action);
      }
    },
    hideExit() {
      this.isExit = false;
    },
    showheader(evt) {
      this.isExit = true;
      console.log("showheader", evt);
    },
    hideHeader(evt) {
      if (this.info.window["size"] == "max") {
        // _t.isHeadShow = false;
        console.log("hideHeader", evt);
      }
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.app-window {
  display: inline-block;
  position: absolute;
  /*left: 50%;*/
  /*top: 50%;*/
  /*z-index: 2000;*/
  overflow: hidden;
  background: #fff;
  /*border: 1px solid #fff;*/
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  writing-mode: horizontal-tb;
  z-index: 2000;

  &.app-window-small {
    /*
      width: 300px;
      height: 200px;
      left: 50%;
      top: 50%;
      margin-left: -150px;
      margin-top: -100px;
      */
  }

  &.app-window-middle {
    /*
      width: 800px;
      height: 600px;
      left: 50%;
      top: 50%;
      margin-left: -400px;
      margin-top: -300px;
      */
  }

  &.app-window-min {
    /*
      width: 0;
      height: 0;
      top: 100%;
      */
  }

  &.app-window-max {
    /*
      display: block;
      top: 0;
      right: 0;
      bottom: 42px;
      left: 0;
      */
  }

  &.app-window-custom {
    /*
      display: block;
      top: 0;
      right: 0;
      bottom: 42px;
      left: 0;
      */
  }

  &.app-window-drag-start,
  &.app-window-drag-move {
    transition: none;
    opacity: 0.7;
    z-index: 2000;
  }

  .app-window-resize {
    width: 20px;
    height: 20px;
    position: absolute;
    background: transparent;
    z-index: 2010;

    &.resize-top-left {
      cursor: nw-resize;
      top: 0;
      left: 0;
    }

    &.resize-top-right {
      cursor: ne-resize;
      top: 0;
      right: 0;
    }

    &.resize-bottom-left {
      cursor: sw-resize;
      bottom: 0;
      left: 0;
    }

    &.resize-bottom-right {
      cursor: se-resize;
      bottom: 0;
      right: 0;
    }

    &.resize-top-border {
      cursor: ns-resize;
      top: 0;
      width: 100%;
      height: 2px;
    }

    &.resize-right-border {
      cursor: ew-resize;
      right: 0;
      width: 2px;
      height: 100%;
    }

    &.resize-bottom-border {
      cursor: ns-resize;
      bottom: 0;
      width: 100%;
      height: 2px;
    }

    &.resize-left-border {
      cursor: ew-resize;
      left: 0;
      width: 2px;
      height: 100%;
    }
  }

  .app-window-header {
    position: absolute;
    top: 0;
    z-index: 2000;
    display: inline-block;
    /*position: relative;*/
    width: 100%;
    height: 30px;
    line-height: 30px;
    /*border-bottom: 1px solid #0E2E49;*/
    /*background: #ffffff;*/

    .window-drag {
      position: absolute;
      left: 0;
      right: 96px;
      height: 100%;
    }

    .window-title {
      text-align: left;
      padding-left: 8px;
      cursor: default;
      color: #ffffff;
      background-color: #4646ab;
    }

    .window-bar {
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      margin: 0 15px;
      text-align: right;

      .window-bar-item {
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        vertical-align: top;
        color: #ffffff;

        &:hover {
          color: #2d8cf0;
        }
      }
    }
  }

  .header-show {
    /* z-index: 3000; */
  }

  .app-window-body {
    position: absolute;
    top: 30px;
    bottom: 0;
    z-index: 2000;
    /*overflow: auto;*/
    width: 100%;
    /*background: #fff;*/
  }

  .maximum {
    top: 0;
    bottom: 0;
    padding: 0;
    z-index: 8000;
  }

  .window-body-hide {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 15px;
    z-index: 2000;
  }

  .window-bar-hide {
    display: inline-block;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 30px;
    text-align: right;
    line-height: 30px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 3000;

    .window-bar-item {
      display: inline-block;
      width: 15px;
      height: 30px;
      margin-right: 10px;
      text-align: left;
      vertical-align: top;
      color: #ffffff;

      &:hover {
        color: #2d8cf0;
      }
    }
  }
}

.x-drag,
.x-drag-start,
.x-drag-move {
  transition: none;
  opacity: 0.7;
  z-index: 2000;
  transform: translateZ(0);
}
</style>