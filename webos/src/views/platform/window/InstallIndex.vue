/*
 * @Author: guk 
 * @Date: 2019-07-10 17:44:46 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-15 17:19:27
 * 
 */


<template>
  <div :style="info.config.install.window.style" class="app-window">
    <div class="app-window-header">
      <div class="window-title">
        {{ info.hasOwnProperty('action') ? (info.action === 'install' ? '安装：' : (info.action === 'uninstall' ? '卸载：' : '')) : '' }}
        {{ info.appTitle || info.config.app.title }}
      </div>
      <div class="window-bar">
        <!-- 关闭 -->
        <div
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
    <div class="app-window-body">
      <Install :info="info"></Install>
      <UnInstall :info="info"></UnInstall>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WallpaperBackground from "@/components/public/WallpaperBackground";
import Install from "@/global/components/Install";
import UnInstall from "@/global/components/Uninstall";
export default {
  name: "InstallIndex",
  components: {
    Install,
    UnInstall
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    installStyle() {
      switch (this.info.action) {
        case "install":
          return info.config.install.window.style;
          break;
        case "uninstall":
          return info.config.uninstall.window.style;
          break;
      }
    }
  },
  created() {},
  methods: {
    handleWindowSize() {
      this.$store.commit("closeInstallWin");
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
  transition: all 0.3s ease-out;
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
    padding: 0 15px;
    line-height: 30px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 3000;

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

.x-drag,
.x-drag-start,
.x-drag-move {
  transition: none;
  opacity: 0.7;
  z-index: 2000;
  transform: translateZ(0);
}
</style>