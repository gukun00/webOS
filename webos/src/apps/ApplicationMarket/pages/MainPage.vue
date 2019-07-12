/*
 * @Author: guk 
 * @Date: 2019-07-12 09:27:40 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-12 11:35:40
 * 应用市场
 */

<template>
  <div class="main-page">
    <div class="category-block">
      <div class="category-header">应用分类</div>
      <div class="category-body">
        <div class="category-list">
          <div
            v-for="item in categoryList"
            :class="{ 'list-item': true, 'active': currentCategory.id === item.id }"
            :key="item.name"
            @click.stop.prevent="handleCategoryTrigger(item)"
          >
            <!-- <Icon class="item-icon" :type="item.icon"></Icon> -->
            <div class="item-title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="app-list-block">
      <!-- FIXME 可以考虑分类下还存在子分类的情况 -->
      <div class="list-header">
        <div class="board-block">
          <div
            v-for="item in boardList"
            :class="{ 'board-item': true, 'active': currentBoard.name === item.name }"
            :key="item.name"
            @click.stop.prevent="handleBoardTrigger(item)"
          >
            <Icon v-if="item.icon" class="item-icon" :type="item.icon"></Icon>
            <div class="item-title">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="list-body">
        <div class="list-item" v-for="item in applicationList" :key="item.name || item.appName">
          <div class="item-logo">
            <img :src="item.config.app.icon || appIcon" :alt="item.title || item.appTitle" />
          </div>
          <div class="item-content">
            <div class="item-title">{{ item.title || item.appTitle}}</div>
            <div
              class="item-description"
              :title="item.description || item.appDescription"
            >{{ item.description || item.appDescription }}</div>
            <div
              class="item-install"
              @click.stop.prevent="handleAction(item, currentBoard.action.name)"
            >{{ currentBoard.action.text }}</div>
          </div>
        </div>
        <NoData :show="!applicationList.length">该分类下暂无应用！</NoData>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { marketApi } from "../api";

export default {
  name: "MainPage",
  data() {
    return {
      // 分类列表
      categoryList: [],
      // 应用列表
      applicationList: [],
      // 当前激活的分类
      currentCategory: null,
      boardList: [
        {
          name: "treasury",
          icon: "",
          title: "宝库",
          action: {
            name: "install",
            text: "安装"
          }
        },
        {
          name: "uninstall",
          icon: "",
          title: "卸载",
          action: {
            name: "uninstall",
            text: "卸载"
          }
        }
      ],
      // 当前激活的board
      currentBoard: null
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.platform.userInfo,
      appData: state => state.platform.appData
    })
  },
  methods: {
    init: async function() {
      let _t = this;
      _t.currentBoard = _t.boardList[0];
      // 获取应用分类列表
      await _t.getCategoryList();
      // 依据当前激活的分类获取应用列表
      _t.getApplicationList();
    },
    // 获取应用分类列表
    getCategoryList: async function(parent) {
      let _t = this;
      // 父分类ID，默认查询父节点为0的一级分类
      parent = parent || 0;
      // 分发action，调接口
      // let res = await _t.$store.dispatch('Apps/ApplicationMarket/category/list', {
      //   parent: parent
      // })
      let res = await marketApi.getCategoryList({
        parent: parent
      });

      if (!res) {
        _t.$message.error("查询应用分类列表失败！");
        return;
      } else if (res.code !== "OK") {
        return;
      }
      // 处理返回数据
      // if (res.data.count && res.data.list && res.data.list.length) {
      //   _t.$Message.success(res.msg || '查询应用分类列表成功！')
      // } else {
      //   _t.$Message.info('暂无数据！')
      // }
      // 更新应用分类列表数据
      _t.categoryList = res.data.list || [];
      // 更新当前分类信息
      _t.currentCategory = _t.categoryList[0];
    },
    // 依据当前激活的分类获取应用列表
    getApplicationList: async function() {
      let _t = this;
      let path = "";
      let payload = {};

      let res = null;
      payload = {
        category: _t.currentCategory ? _t.currentCategory.id : "",
        account: this.userInfo.account
      };
      // 获取当前board下的应用列表
      switch (_t.currentBoard.name) {
        case "treasury":
          res = await marketApi.getApplicationList(payload);
          break;
        case "uninstall":
          // 获取用户应用数据(卸载使用)
          res = await this.$api.application.getApplicationListByUserId(payload);
          //path = _t.$utils.store.getType('Admin/user/application/list', 'Platform')
          break;
      }

      console.log(res)
      // 分发action，调接口

      if (!res) {
        _t.$message.error("查询应用列表失败！");
        return;
      } else if (res.code !== "OK") {
        return;
      }
      // 处理返回数据
      if (res.data.count && res.data.list && res.data.list.length) {
        _t.$message.success(res.msg || "查询应用列表成功！");
      } else {
        // _t.$message.info('暂无数据！')
      }
      // 更新应用列表数据
      let applicationList = res.data.list || [];
      _t.applicationList = applicationList.map(item => {
        item.config = JSON.parse(item.config);
        return item;
      });
    },
    // 处理分类点击事件
    handleCategoryTrigger: function(item) {
      let _t = this;
      _t.currentCategory = item;
      // 获取当前分类下的应用列表
      _t.getApplicationList();
    },
    // 处理应用安装/卸载
    handleAction: function(appInfo, action) {
      let _t = this;
      // 处理安装
      let handleInstall = function() {
        // 安装信息
        let installInfo = {};
        let iconList = [..._t.appData.iconList];
        // 查找单个索引
        let findAppIndex = function(iconList, condition) {
          return iconList.findIndex(item => {
            return condition(item);
          });
        };
        let currentAppIndex = findAppIndex(
          iconList,
          item => item.config.app.name === appInfo.config.app.name
        );
        if (currentAppIndex < 0) {
          installInfo = {
            // 解构应用基础配置
            ...appInfo,
            config: {
              ...appInfo.config,
              // 解构应用安装配置
              ...appInfo.config.install
            },
            // 应用ID
            appID: appInfo.id,
            // 赋值当前操作为 install
            action: "install",
            // 是否已安装过
            installed: false
          };
        } else {
          let currentApp = iconList[currentAppIndex];
          installInfo = {
            // 解构应用基础配置
            ...currentApp,
            config: {
              ...currentApp.config,
              // 解构应用安装配置
              ...appInfo.config.install
            },
            // 应用ID
            appID: appInfo.id,
            // 赋值当前操作为 install
            action: "install",
            // 是否已安装过
            installed: true
          };
        }
        // 调用安装工具，打开安装界面
        _t.$utils.install(_t, installInfo);
      };
      // 处理卸载
      let handleUninstall = function() {
        // 调用卸载工具，打开卸载界面
        _t.$utils.uninstall(_t, {
          // 解构应用基础配置
          ...appInfo,
          config: {
            ...appInfo.config,
            // 解构应用卸载配置
            ...appInfo.config.uninstall
          },
          // 赋值当前操作为 uninstall
          action: "uninstall",
          // 是否已安装过
          installed: true
        });
      };
      switch (action) {
        case "install":
          handleInstall();
          break;
        case "uninstall":
          handleUninstall();
          break;
      }
    },
    // 处理board点击事件
    handleBoardTrigger: function(item) {
      let _t = this;
      _t.currentBoard = item;
      // 获取当前分类下的应用列表
      _t.getApplicationList();
    }
  },
  created: function() {
    let _t = this;
    _t.init();
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.main-page {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;

  .category-block {
    flex: 0 0 120px;
    height: 100%;
    border-right: 1px solid #dddddd;

    .category-header {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px solid #dddddd;
    }

    .category-body {
      display: inline-block;
      width: 100%;

      .category-list {
        .list-item {
          padding: 10px 0 10px 20px;
          border-bottom: 1px solid #ffffff;

          &:hover,
          &.active {
            background: #0ccc6c;

            .item-icon,
            .item-title {
              color: #ffffff;
            }
          }

          .item-icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
            color: #bfbfbf;
          }

          .item-title {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
          }
        }
      }
    }
  }

  .app-list-block {
    flex: 1 1 auto;
    height: 100%;

    .list-header {
      display: inline-block;
      width: 100%;

      .board-block {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #dddddd;

        .board-item {
          flex: 1 1 auto;
          height: 40px;
          line-height: 40px;
          text-align: center;

          &:hover,
          &.active {
            background: #0ccc6c;

            .item-icon,
            .item-title {
              color: #ffffff;
            }
          }

          .item-icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
          }

          .item-title {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
          }
        }
      }
    }

    .list-body {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      width: 100%;
      /*height: 100%;*/

      .list-item {
        flex: 0 0 auto;
        min-height: 68px;
        max-height: 100px;
        margin: 5px;
        padding: 10px;

        &:hover {
          background: #ebf7ff;

          .item-content {
            .item-install {
              display: inline-block;
            }
          }
        }

        .item-logo {
          display: inline-block;
          width: 48px;
          height: 48px;
          margin: 0 5px;
          vertical-align: top;

          img {
            width: 100%;
          }
        }

        .item-content {
          display: inline-block;
          width: 100px;
          height: 100%;
          overflow: hidden;
          position: relative;

          .item-title {
            display: inline-block;
            width: 100%;
            height: 20px;
            line-height: 20px;
          }

          .item-description {
            display: inline-block;
            width: 100%;
            height: 40px;
            line-height: 20px;
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .item-install {
            display: none;
            position: absolute;
            left: 0;
            bottom: 0;
            padding: 2px 10px;
            background: #5ed2ff;
            color: #ffffff;
            cursor: default;

            &:hover {
              background: #73d7fe;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>