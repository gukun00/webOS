/*
 * @Author: guk 
 * @Date: 2019-07-10 17:48:22 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-16 20:07:30
 * IFRAME类型的窗口
 */


<template>
  <div class="app-window-iframe"  v-loading="loadStatus === 'loading'">
    <div class="loading">
    </div>
    <div
      v-show="loadStatus === 'fail'"
      :class="{ 'load-complete': true, 'load-fail': loadStatus === 'fail' }"
    >
      <div class="load-text">加载应用程序</div>
      <div class="load-text load-text-strong">{{ info.appInfo.appTitle || info.appInfo.config.app.title }}</div>
      <div class="load-text">失败！</div>
    </div>
    <iframe
      class="iframe-box"
      name="iframe-box"
      :src="appPath"
      :width="appWidth"
      :height="appHeight"
      frameborder="0"
      marginwidth="0"
      marginheight="0"
    >
    </iframe>
  </div>
</template>

<script>
  export default {
    name: 'WinIFrame',
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        appPath: null,
        appWidth: 0,
        appHeight: 0,
        // 加载状态 loading：加载中 fail：加载失败 success：加载成功
        loadStatus: ''
      }
    },
    watch: {
      info: {
        handler: function () {
          let _t = this
          // 初始化窗口
          _t.init()
        },
        deep: true
      }
    },
    methods: {
      // 初始化
      init: function () {
        let _t = this
        // 加载应用
        _t.loadApp()
      },
      // 加载应用
      loadApp: function () {
        let _t = this
        _t.loadStatus = 'loading'
        _t.$nextTick(function () {
          _t.appWidth = _t.$el ? parseInt(_t.$el.offsetWidth) : '100%'
          _t.appHeight = _t.$el ? parseInt(_t.$el.offsetHeight) : '100%'
          if(_t.info.appInfo.config.app.url.indexOf("#")>-1){
            _t.appPath = _t.info.appInfo.config.app.url
          }else{
            _t.appPath = _t.info.appInfo.config.app.url + "#"
          }
         
          console.log(_t.appPath + "-----------------iframe加载！");
          _t.loadStatus = _t.appPath ? 'success' : 'fail'

          //document.getElementsByTagName("iframe")[0].contentWindow.top = document.getElementsByTagName("iframe")[0].contentWindow;
          document.body.onbeforeunload = function (event) {
            console.log("onbeforeunloadonbeforeunload")
            if (!window.event) {
              event.returnValue = false
            } else {
              window.event.returnValue = false
            }
          }
        })
      }
    },
    created: function () {
      let _t = this
      // 初始化窗口
      _t.init()
    },
    beforeDestroy: function () {
      document.body.onbeforeunload = null
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .app-window-iframe {
    width: 100%;
    height: 100%;
    /*background: #ffffff;*/

    .loading {
      display: inline-block;
      margin-top: 10px;

      .loading-icon{
        animation: loading-spin 1s linear infinite;
      }
      @keyframes loading-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
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
    .iframe-box {
      margin: 0 auto;
      width: 100%;
      height: 100%;
    }
  }
</style>

