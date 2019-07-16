/*
 * @Author: guk 
 * @Date: 2019-07-15 11:30:37 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-16 16:53:19
 * 卸载APP界面
 */

<template>
  <div class="app-block">
    <div class="block-header">
      <div class="title">{{ info.appTitle || info.config.app.title }}</div>
    </div>
    <div class="block-body" v-loading="isLoading">
      <div class="logo">
        <img :src="info.config.app.icon" :alt="info.appTitle || info.config.app.title" />
      </div>
      <div
        :class="{ 'complete': true, 'complete-success': isSuccess, 'complete-fail': !isSuccess }"
        v-show="isComplete"
      >
        <!-- <Icon :type="isSuccess ? 'checkmark-circled' : 'close-circled'"></Icon> -->
        {{ completeMsg }}
      </div>
      <el-button
        class="button"
        type="primary"
        :disabled="isSuccess"
        v-show="!isLoading"
        @click="handleUninstall"
      >立即卸载</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//总线， 可以传递刷新方法等
import { EventBus } from "@/views/platform/js/event-bus.js";
export default {
  name: "Uninstall",
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      // 是否加载中
      isLoading: false,
      // 是否完成
      isComplete: false,
      // 是否成功
      isSuccess: false,
      // 完成提示信息
      completeMsg: ""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.platform.userInfo
    })
  },
  methods: {
    handleUninstall: function() {
      this.$api.platform
        .doUnInstall({
          id: this.info.id,
          account: this.userInfo.account
        })
        .then(res => {
          if (!res || res.code !== "OK") {
            this.$message.error("卸载失败！" + res.msg);
            return;
          }
          this.$message.info(res.msg || "卸载成功！");
          // 刷新用户应用列表
          EventBus.$emit("refresh");
          //关闭
          this.$store.commit("closeInstallWin");
        });
    }
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.app-block {
  width: 100%;
  height: 100%;
  background: #fff;
  display: inline-block;

  .block-header {
    .title {
      display: inline-block;
      text-align: center;
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
  .block-body {
    display: inline-block;
    text-align: center;
    width: 100%;

    .logo {
      height: 50px;

      img {
        width: 48px;
        height: 48px;
      }
    }
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
    .complete {
      display: inline-block;
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 14px;

      &.complete-success {
        color: #19be6b;
      }
      &.complete-fail {
        color: #ed3f14;
      }
    }
    .button {
      margin-top: 50px;
    }
  }
}
</style>
