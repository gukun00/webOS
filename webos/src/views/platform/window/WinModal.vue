/*
 * @Author: guk 
 * @Date: 2019-07-10 17:47:41 
 * @Last Modified by:   guk 
 * @Last Modified time: 2019-07-10 17:47:41 
 * 内置应用程序
 */

<template>
  <div class="app-window-modal">
    <div class="loading" v-show="loadStatus === 'loading'">
      <Spin fix>
        <Icon class="loading-icon" type="load-c" size="18"></Icon>
        <div class="loading-text">加载中...</div>
      </Spin>
    </div>
    <div v-show="loadStatus === 'fail'" :class="{ 'load-complete': true, 'load-fail': loadStatus === 'fail' }">
      <Icon type="close-circled"></Icon>
      <div class="load-text">加载应用程序</div>
      <div class="load-text load-text-strong">{{ info.appTitle || info.config.app.title }}</div>
      <div class="load-text">失败！</div>
    </div>
    <component :is="appComponent" v-if="appComponent" :info="info"></component>
  </div>
</template>

<script>
  export default {
    name: "WinModal",
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        appComponent: null,
        // 加载状态 loading：加载中 fail：加载失败 success：加载成功
        loadStatus: ""
      };
    },
    methods: {
      // 初始化
      init: function () {
        let _t = this;
        // 加载应用
        _t.loadApp();
      },
      // 加载应用
      loadApp: function () {
        let _t = this;
        _t.loadStatus = "loading";
        console.log(_t.info, "_t.info_t.info");
        let appName = _t.info.appName || _t.info.config.app.name;
        let path = "";
        // TODO 判断当前操作是install || uninstall || openApp
        // 常规打开
        let handler = function (path) {
          // 动态加载组件
          require.ensure([], require => {
            let isSuccess = false;
            console.log(_t.info, path, "--------------------------------");

            //安装或者卸载
            var modelType;
            // TODO 后面对结构体进行改良
            if (_t.info.action === "install" || _t.info.action === "uninstall") {
              //if(_t.info)
              isSuccess = false;
            } else {
              try {
                let appComponent = () => import("@/apps/" + path + "/Index.vue");
                console.log("前@/global/components/" + path + ".vue");
                _t.appComponent = appComponent;
                isSuccess = true;
              } catch (err) {
                isSuccess = false;
                console.warn(
                  "WARNG:: LOAD",
                  "@/apps/" + path + "/Index.vue",
                  "FAIL!"
                );
              }
            }

            if (!isSuccess && _t.info.hasOwnProperty("action")) {
              if (_t.info.action === "install") {
                path = "Install";
              } else if (_t.info.action === "uninstall") {
                path = "Uninstall";
              }
              try {
                let appComponent = () =>
                  import("@/global/components/" + path + ".vue");
                console.log("后@/global/components/" + path + ".vue");
                _t.appComponent = appComponent;
                isSuccess = true;
              } catch (err) {
                isSuccess = false;
                console.warn(
                  "WARNG:: LOAD",
                  "@/global/components/" + path + ".vue",
                  "FAIL!"
                );
              }
            }
            // 更新加载状态
            _t.loadStatus = isSuccess ? "success" : "fail";
          });
        };
        console.log("loadApp _t.info", _t.info);
        if (_t.info.hasOwnProperty("action")) {
          if (_t.info.action === "install") {
            path = appName + "/install";
          } else if (_t.info.action === "uninstall") {
            path = appName + "/uninstall";
          } else {
            path = appName;
          }
        } else {
          path = appName;
        }
        handler(path);
      },
    },
    watch: {
      info: function (newValue, oldValue) {
        if (newValue.id != oldValue.id) {
          console.log("窗口信息更新---------")
          console.log("newValue:", newValue, "oldValue:", oldValue)
          let _t = this;
          _t.init();
        }
      }
    },
    created: function () {
      let _t = this;
      // 初始化窗口
      console.log("初始化窗口--------")

      _t.init();
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  .app-window-modal {
    width: 100%;
    height: 100%;
    /*background: #ffffff;*/

    .loading {
      display: inline-block;
      margin-top: 10px;

      .loading-icon {
        animation: loading-spin 1s linear infinite;
      }

      @keyframes loading-spin {
        from {
          transform: rotate(0deg);
        }

        50% {
          transform: rotate(180deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }

    .load-complete {
      display: inline-block;
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      margin: 20px 0;

      &.load-success {
        color: #19be6b;
      }

      &.load-fail {
        color: #ed3f14;
      }

      .load-text {
        display: inline-block;
      }

      .load-text-strong {
        color: #000000;
      }
    }
  }
</style>