/*
 * @Author: guk 
 * @Date: 2019-07-08 10:45:24 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-17 10:52:52
 * 这是桌面
 */


<template>
  <div
    class="app-desktop"
    @click.stop="handleLeftClick($event)"
    @contextmenu.stop.prevent="handleRightClick($event)"
  >
    <div class="app-desktop-box" @drop.stop.prevent="handleDesktopIconDrop" @dragover.stop.prevent>
      <DesktopIcon
        v-for="(item, index) in appData_installed"
        :key="'desktop_icon_' + index"
        :info="item"
        :showTitle="appData_installed.showTitle"
        :style="item.config.desktopIcon.style"
        v-on:icon-drag-down="setDragTarget"
      ></DesktopIcon>
      <WinIndex v-for="(item, index) in openedWindowList" :key="item.window.key" :info="item" :style="item.window.style"></WinIndex>
      <InstallIndex v-if="installInfo != null" :info="installInfo"></InstallIndex>
      <Wallpaper switchType="win7" :style="{ 'z-index': 1000 }"></Wallpaper>
    </div>
    <slot></slot>
    <TaskBar v-show="taskBarShow">
      <StartMenu slot="StartMenu"></StartMenu>
      <TaskBarIconBox slot="TaskBarIconBox"></TaskBarIconBox>
      <TaskBarWidget slot="TaskBarWidget"></TaskBarWidget>
    </TaskBar>
    <ContextMenu></ContextMenu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Wallpaper from "./Wallpaper";
import DesktopIcon from "./DesktopIcon";
import { handleGridLayout } from "./js/handleDesktop";
import ContextMenu from "../../components/public/ContextMenu";

import TaskBar from "./taskbar/TaskBar";
import StartMenu from "./taskbar/StartMenu";
import TaskBarIconBox from "./taskbar/TaskBarIconBox";
import TaskBarWidget from "./taskbar/TaskBarWidget";
import WinIndex from "./window/WinIndex";
import InstallIndex from "./window/InstallIndex";
import * as osHelper from "./../../utils/osHelper";
//总线， 可以传递刷新方法等
import { EventBus } from "./js/event-bus.js";
export default {
  name: "Desktop",
  components: {
    Wallpaper,
    DesktopIcon,
    ContextMenu,
    TaskBar,
    TaskBarIconBox,
    StartMenu,
    TaskBarWidget,
    WinIndex,
    InstallIndex
  },
  props: {},
  data() {
    return {
      taskBarShow: true,
      //拖动的对象
      dragTarget: {},
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
      currentDirection: "top-bottom-left-right"
    };
  },
  computed: {
    ...mapState({
      appData: state => state.platform.appData,
      desktopWindows: state => state.winShow.desktopWindows,
      installInfo: state => state.winShow.installInfo,
      userInfo: state => state.platform.userInfo
    }),
    appData_installed: function() {
      //过滤得到已经安装的app
      let installed = [];
      if (this.appData) {
        this.appData.forEach(element => {
          if (element.action === "installed") {
            installed.push(element);
          }
        });
      }
      return installed;
    },
    openedWindowList: function() {
      let windowArr = this.desktopWindows.filter(
        item => item.window.status === "open"
      );
      return windowArr;
    },
    openedInstallWindowList: function() {
      let windowArr = this.desktopWindows.filter(
        item => item.window.status === "open"
      );
      return windowArr;
    }
  },
  methods: {
    getUserAppData: function() {
      let account = sessionStorage.getItem("user");
      let params = {
        account: account,
        category: 1
      };
      this.$api.application.getApplicationListByUserId(params).then(res => {
        if (res.code === "OK") {
          //这边把config转成json
          res.data.list.forEach(element => {
            element.config = JSON.parse(element.config);
            element.action = "installed";
          });

          this.$store.commit("setUserInfo", {
            account: account,
            isLogin: true
          });

          let sortedApData = this.handleIconList(res.data.list);
          this.$store.commit("updateAppData", sortedApData);
        } else {
          this.$message.info("获取app失败！" + res.msg);
        }
      });
    },
    handleIconList: function(appData) {
      let flag = true;
      let firstGrid = this.gridArr[0][0];
      for (let item of appData) {
        let xVal = 0;
        let yVal = 0;
        // FIXME 取中心点坐标
        xVal =
          (firstGrid.rightBottom.x - firstGrid.leftTop.x) / 2 +
          firstGrid.leftTop.x;
        yVal =
          (firstGrid.rightBottom.y - firstGrid.leftTop.y) / 2 +
          firstGrid.leftTop.y;

        let distanceArr = this.handleDistanceToGrid(xVal, yVal);
        let distanceArrBack = [...distanceArr];
        if (flag) {
          flag = false;
        }
        // 目标Grid，FIXME 【BUG】此处需要考虑从上到下，从左到有的排布规则
        let targetGrid = this.findGridForAuto(distanceArr, distanceArrBack);
        if (!targetGrid) {
          continue;
        }
        // 更新style
        let style = {
          left: targetGrid.leftTop.x + "px",
          top: targetGrid.leftTop.y + "px"
        };

        item.config.desktopIcon.style = style;
      }
      return appData;
    },
    // 计算与各个grid的距离
    handleDistanceToGrid: function(xVal, yVal) {
      let distanceArr = [];
      for (let childArr of this.gridArr) {
        let distanceChildArr = [];
        for (let item of childArr) {
          let distanceLeftTop = Math.sqrt(
            Math.pow(yVal - item.leftTop.y, 2) +
              Math.pow(xVal - item.leftTop.x, 2)
          );
          let distanceRightBottom = Math.sqrt(
            Math.pow(yVal - item.rightBottom.y, 2) +
              Math.pow(xVal - item.rightBottom.x, 2)
          );
          distanceChildArr.push(distanceLeftTop + distanceRightBottom);
        }
        distanceArr.push(distanceChildArr);
      }
      return distanceArr;
    },
    // 2.2.递归查找距离最小且未占用的grid FIXME 【BUG】此处需要考虑从上到下，从左到有的排布规则
    findGridForAuto: function(distanceArr, distanceArrBack) {
      // 2.2.1.求距离最小值 FIXME 【注意】某些情况下会存在多个相等的最小距离
      let targetGrid;
      for (let childIndex in distanceArr) {
        let childArr = distanceArr[childIndex];
        if (!childArr.length) {
          continue;
        }
        let minDistance = Math.min(...childArr);
        let childItemIndex = distanceArrBack[childIndex].indexOf(minDistance);
        targetGrid = this.gridArr[childIndex][childItemIndex];
        // 判断是否占用
        if (targetGrid) {
          if (targetGrid.isOccupied) {
            // 过滤调已占用的距离
            let filterFlag = true;
            let tmpArr = distanceArr[childIndex].filter(item => {
              if (item !== minDistance) {
                return true;
              } else {
                if (filterFlag) {
                  filterFlag = false;
                  return false;
                } else {
                  return true;
                }
              }
            });
            distanceArr[childIndex] = tmpArr;
            targetGrid = this.findGridForAuto(distanceArr, distanceArrBack);
            if (targetGrid) {
              break;
            } else {
              continue;
            }
          } else {
            // 标记targetGrid占用
            this.gridArr[childIndex][childItemIndex]["isOccupied"] = true;
            break;
          }
        }
      }
      return targetGrid;
    },
    handleGridLayout: function() {
      //方法太长了，我换到另外一个js里面了
      handleGridLayout.apply(this);
    },
    setDragTarget: function(target) {
      this.dragTarget = target;
    },
    // 处理桌面图标drop
    handleDesktopIconDrop: function() {
      console.log("handleDesktopIconDrop");
      let targetData = this.dragTarget.data || {};
      // 健壮，防止空数据
      if (!Object.keys(targetData).length) {
        return;
      }
      // 1.计算 icon drop 时的坐标
      let xVal = event.clientX - targetData.offsetX;
      let yVal = event.clientY - targetData.offsetY;
      console.log(xVal, yVal);
      // 2.查找 icon drop 时所处的grid
      // 2.1.遍历gridArr，计算与每个grid的leftTop、rightBottom点的距离
      let distanceArr = this.handleDistanceToGrid(xVal, yVal);
      let distanceArrBack = [...distanceArr];
      // 目标Grid
      let appInfo = targetData.appInfo;
      let targetGrid = this.findGridForDrag(
        distanceArr,
        distanceArrBack,
        appInfo
      );
      // 更新style
      let style = {
        left: targetGrid.leftTop.x + "px",
        top: targetGrid.leftTop.y + "px"
      };
      this.$store.commit("updateOneAppIconStyle", {
        info: appInfo,
        style: style
      });
    },
    findGridForDrag: function(distanceArr, distanceArrBack, appInfo) {
      // 2.2.1.求距离最小值 FIXME 【注意】某些情况下会存在多个相等的最小距离
      let targetGrid;
      // 获取最小距离数组
      let minDistanceArr = [];
      for (let childArr of distanceArr) {
        minDistanceArr.push(Math.min(...childArr));
      }
      let minDistance = Math.min(...minDistanceArr);
      let childIndex = minDistanceArr.indexOf(minDistance);
      let childItemIndex = distanceArr[childIndex].indexOf(minDistance);
      targetGrid = this.gridArr[childIndex][childItemIndex];
      // 判断是否占用
      if (targetGrid) {
        // 如果占用则递归
        if (targetGrid.isOccupied) {
          // 过滤调已占用的距离
          let filterFlag = true;
          let tmpArr = distanceArr[childIndex].filter(item => {
            if (item !== minDistance) {
              return true;
            } else {
              if (filterFlag) {
                filterFlag = false;
                return false;
              } else {
                return true;
              }
            }
          });
          distanceArr[childIndex] = tmpArr;
          targetGrid = this.findGridForDrag(
            distanceArr,
            distanceArrBack,
            appInfo
          );
        } else {
          // 标记targetGrid占用
          this.gridArr[childIndex][childItemIndex]["isOccupied"] = true;
          // 解除之前的grid占用
          let leftVal = parseFloat(appInfo.config.desktopIcon.style.left);
          let topVal = parseFloat(appInfo.config.desktopIcon.style.top);
          for (let childIndex in this.gridArr) {
            let childArr = this.gridArr[childIndex];
            for (let childItemIndex in childArr) {
              let childItem = this.gridArr[childIndex][childItemIndex];
              if (
                childItem.leftTop.x === leftVal &&
                childItem.leftTop.y === topVal
              ) {
                // 解除之前的grid占用
                this.gridArr[childIndex][childItemIndex]["isOccupied"] = false;
                break;
              }
            }
          }
        }
      }
      return targetGrid;
    },
    // 桌面左键点击
    handleLeftClick: function() {
      this.$store.commit("toggleRightMenu", false);
      this.$store.commit("toggleStartMenuShow", false);
    },
    // 桌面右键点击
    handleRightClick: function(event) {
      let _t = this;
      let xVal = parseInt(event.clientX);
      let yVal = parseInt(event.clientY);
      // 菜单信息
      let contextMenuInfo = {
        isShow: true,
        x: xVal,
        y: yVal,
        target: "home",
        list: [
          {
            name: "refresh",
            icon: {
              class: "icon iconfont icon-reload",
              style: ""
            },
            text: "刷新",
            enable: true,
            action: {
              handler: () => {
                this.handleGridLayout();
                //获取appData
                this.getUserAppData();
              }
            }
          },
          {
            name: "fullScreen",
            icon: {
              class: "icon iconfont icon-fullscreen",
              style: ""
            },
            style: {
              display: osHelper.isFullScreen() ? "none" : ""
            },
            text: "全屏",
            enable: true,
            action: {
              handler: osHelper.fullScreen
            }
          },
          {
            name: "cancelFullScreen",
            icon: {
              class: "icon iconfont icon-fullscreen-exit",
              style: ""
            },
            style: {
              display: osHelper.isFullScreen() ? "" : "none"
            },
            text: "取消全屏",
            enable: true,
            action: {
              handler: osHelper.exitFullScreen
            }
          },
          {
            name: "changeWallpaper",
            icon: {
              class: "",
              style: ""
            },
            style: {},
            text: "更换壁纸",
            enable: true,
            action: {
              handler: osHelper.exitFullScreen
            }
          }
        ]
      };
      // 广播事件
      //_t.$utils.bus.$emit('platform/contextMenu/show', contextMenuInfo)
      this.$store.commit("updateMenuItems", contextMenuInfo);
      //this.$store.commit("toggleRightMenu", true);
    }
  },
  created: function() {
    this.handleGridLayout();
    //获取appData
    this.getUserAppData();
  },
  mounted() {
    // this.nextTick(() => {
    //   //计算格子
    //   this.handleGridLayout();
    // });
    EventBus.$on("refresh", () => {
      this.$nextTick(() => {
        this.handleGridLayout();
        //获取appData
        this.getUserAppData();
      });
    });
    console.log(this.userInfo, "this.userInfo");
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
