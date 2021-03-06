/*
 * @Author: guk 
 * @Date: 2019-07-08 15:24:23 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-12 17:57:13
 * 桌面图标
 */

<template>
  <div
    class="desktop-icon"
    @mousedown.left="mouseDownHandle"
    @mouseup.left="mouseUpHandle"
    @dblclick="openApp"
    @contextmenu.stop.prevent="handleRightClick($event)"
    draggable="true"
    @dragstart="handleDragStart"
    :title="info.appTitle || info.config.app.title"
    :data-name="info.appName || info.config.app.name"
  >
    <img
      :class="{ 'desktop-icon-down': isMouseDown}"
      v-if="info.config.app.icon"
      :src="info.config.app.icon || appIcon"
      :data-name="info.appName || info.config.app.name"
    />
    <!--<img :class="{ 'desktop-icon-down': isMouseDown}" v-if="info.app.icon" src="../../../apps/ApplicationMarket/assets/logo.png" :data-name="info.app.name">-->
    <span
      v-if="showTitle"
      :data-name="info.appName || info.config.app.name"
    >{{ info.appTitle || info.config.app.title }}</span>
    <div class="app-icon-bg" v-if="info.config.app.icon && enableAppIconBg">
      <div class="content" :style="appIconBg"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DesktopIcon",
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          app: {
            icon: "",
            title: "",
            name: "",
            id: "",
            index: ""
          },
          modal: {
            size: "",
            isShow: false
          },
          taskBar: {
            isPinned: false
          }
        };
      },
      required: true
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isMouseDown: false,
      enableAppIconBg: false
    };
  },
  computed: {
    ...mapState({
      appData: state => state.appData
    }),
    appIconBg: function() {
      let icon =
        this.info.config.app.hasOwnProperty("icon") && this.info.config.app.icon
          ? this.info.config.app.icon
          : null;
      if (!icon) {
        return {};
      }
      return {
        backgroundImage: "url(" + icon + ")"
      };
    }
  },
  methods: {
    // 鼠标按下
    mouseDownHandle: function() {
      this.isMouseDown = true;
    },
    mouseUpHandle: function() {
      this.isMouseDown = false;
    },
    // 打开应用
    openApp: function() {
      this.isMouseDown = false;
      let appInfo = { ...this.info };
      this.$store.commit("openWindow", {
        appInfo: appInfo
      });
    },
    // 右键菜单
    handleRightClick: function(event) {
      let xVal = parseInt(event.clientX);
      let yVal = parseInt(event.clientY);
      let appName =
        event.target.dataset["name"] ||
        this.info.appName ||
        this.info.config.app.name ||
        null;
      let appInfo = { ...this.info };
      // 菜单信息
      let contextMenuInfo = {
        isShow: true,
        x: xVal,
        y: yVal,
        target: "desktopIcon",
        appName: appName,
        data: {
          ...this.info
        },
        list: [
          {
            name: "refresh",
            icon: {
              type: "refresh",
              style: ""
            },
            text: "刷新",
            enable: true,
            action: {
              type: "bus",
              handler: "platform/refresh"
            }
          },
          {
            name: "openApp",
            icon: {
              type: "",
              style: ""
            },
            //text: appInfo.window.status === "open" ? "关闭" : "打开",
            text: "打开",
            enable: true,
            action: {
              type: "global",
              handler: () => {
                this.$store.commit("openWindow", {
                  appInfo: appInfo
                });
              }
            }
          },
          {
            name: "openAppInNewBrowserTab",
            icon: {
              type: "",
              style: ""
            },
            text: "在新标签页中打开",
            enable:
              this.info.config.window.type === "iframe" &&
              this.info.config.app.url,
            action: {
              type: "bus",
              handler: "platform/app/openInNewBrowserTab"
            }
          },
          {
            name: "uninstallApp",
            icon: {
              type: "",
              style: ""
            },
            text: "卸载",
            enable: true,
            action: {
              type: "callback",
              handler: () => {
                this.$utils.uninstall(this, {
                  // 解构应用基础配置
                  ...this.info,
                  config: {
                    ...this.info.config,
                    // 解构应用卸载配置
                    ...this.info.config.uninstall
                  },
                  // 赋值当前操作为 uninstall
                  action: "uninstall",
                  // 是否已安装过
                  installed: true
                });
              }
            }
          }
        ]
      };

      this.$store.commit("updateMenuItems", contextMenuInfo);
      // 广播事件
      // _t.$utils.bus.$emit("platform/contextMenu/show", contextMenuInfo);
    },
    // FIXME 拖拽处理，可以考虑实现选区拖拽
    handleDragStart: function(event) {
      // let _t = this
      // // 广播事件，关闭菜单
      // _t.$utils.bus.$emit('platform/contextMenu/hide')
      let appInfo = this.info;
      // 鼠标点击位置相对拖拽对象位置
      let offsetX = event.offsetX;
      let offsetY = event.offsetY;
      // 拖拽对象数据
      let targetInfo = {
        target: "DesktopIcon",
        data: {
          id: appInfo.config.app.id,
          title: appInfo.config.app.title,
          name: appInfo.config.app.name,
          offsetX: offsetX,
          offsetY: offsetY,
          appInfo: appInfo
        }
      };

      //分发拖拽数据，到桌面组件计算位置
      this.$emit("icon-drag-down", targetInfo);
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.desktop-icon {
  width: 80px;
  height: 80px;
  margin: 10px;
  padding: 5px;
  text-align: center;
  display: inline-block;
  position: absolute;
  z-index: 2000;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: all 0.2s ease-out;
  user-select: none;
  writing-mode: lr-tb;
  overflow: hidden;

  &:after {
    content: " ";
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.5);
    filter: blur(25px);
    opacity: 0;
    overflow: hidden;
  }
  &:hover {
    /*background: rgba(250, 253, 255, .3);*/
    border-color: #b9d7fc;
    &:after {
      opacity: 1;
    }

    .app-icon-bg {
      display: block !important;
      /*filter: blur(6px);*/
      .content {
        /*filter: blur(10px);*/
      }
    }
  }

  img {
    display: block;
    width: 48px;
    height: 48px;
    border-radius: 5px;
    margin: 0 auto;
  }
  .desktop-icon-down {
    width: 47px;
    height: 47px;
  }
  span {
    display: inline-block;
    width: 100%;
    color: #ffffff;
    cursor: default;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 5px;
  }

  .app-icon-bg {
    position: absolute;
    display: none;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    /*filter: blur(50px);*/
    /*background-position: center top;*/
    transition: all 0.2s ease-out;
    /*background-size: cover;*/
    /*background-attachment: fixed;*/

    .content {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      filter: blur(50px);
      background-color: transparent;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
}
</style>
