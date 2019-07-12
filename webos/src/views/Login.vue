/*
 * @Author: guk 
 * @Date: 2019-07-06 14:09:35 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-12 10:10:40
 */

<template>
  <div class="app-login">
    <WallpaperBackground></WallpaperBackground>
    <div class="main-box">
      <!-- <a :href="$Config.System.repository.url" target="_blank">
        <img
          style="position: absolute; top: -2px; right: -2px; border: 0; z-index: 5000"
          src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"
          alt="Fork me on GitHub"
        >
      </a>-->
      <div class="login-header">
        <div class="avatar-block">
          <img class="avatar" :src="logo" alt />
        </div>
      </div>
      <div class="login-body">
        <el-form class="login-form" ref="signInForm" :model="formData" :rules="signInFormRules">
          <el-form-item class="form-item" prop="account">
            <el-input type="text" v-model="formData.account" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <el-input
              :type="passwordInputType"
              v-model="formData.password"
              placeholder="请输入密码，回车登录"
              @on-enter="handleSignIn"
            >
              <el-button
                slot="append"
                :icon="passwordInputType === 'password' ? 'icon iconfont icon-xianshimima' : 'icon iconfont icon-yincangmima'"
                style="font-size: 16px; line-height: 1;"
                @click="showPassword"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="notice-text">测试账号：admin，密码：admin</div>
      </div>
      <div class="login-footer">
        <el-button type="primary" size="large" long :loading="loading" @click="handleSignIn">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import WallpaperBackground from "@/components/public/WallpaperBackground";
import { System } from "@/utils/config";

export default {
  name: "Login",
  components: {
    WallpaperBackground
  },
  data() {
    return {
      logo: System.logo,
      showSignInModal: true,
      loading: false,
      // 表单数据
      formData: {
        account: "",
        password: ""
      },
      signInFormRules: {
        account: [
          { required: true, message: "请填写用户名", trigger: "change" }
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "change" },
          {
            type: "string",
            min: 4,
            max: 16,
            message: "密码长度必须在4到16位之间",
            trigger: "change"
          }
        ]
      },
      // 密码输入框类型
      passwordInputType: "password"
    };
  },
  methods: {
    handleSignIn: async function() {
      let userInfo = {
        account: this.formData.account.trim(),
        password: this.formData.password.trim()
      };
      this.$api.login
        .login(userInfo)
        .then(res => {
          if (res.msg != null) {
            this.$message({
              message: res.msg,
              type: "error"
            });
          } else {
            this.$Cookies.set("token", res.data.token); // 放置token到Cookie
            sessionStorage.setItem("user", userInfo.account); // 保存用户到本地会话

            this.$store.commit(
              "setUserInfo",
              {
                ...userInfo,
                isLogin: true
              }
            );

            //this.$store.commit("menuRouteLoaded", false); // 要求重新加载导航菜单
            this.$router.push({ name: "首页" }); // 登录成功，跳转到主页
          }
          this.loading = false;
        })
        .catch(res => {
          this.$message({
            message: res.message,
            type: "error"
          });
        });
    },
    showPassword: function() {
      let _t = this;
      _t.passwordInputType =
        _t.passwordInputType === "password" ? "text" : "password";
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.app-login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .main-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 280px;
    /*height: 250px;*/
    margin-left: -140px;
    margin-top: -200px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;

    &:hover,
    &:focus {
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
    }
  }

  .login-header {
    text-align: center;
    background: #fff;
    height: 129px;

    .avatar-block {
      display: inline-block;
      width: 280px;
      height: 120px;
      margin: 30px auto;
      overflow: hidden;

      .avatar {
        display: inline-block;
        width: 280px;
        height: 60px;
        margin: 0px;
        padding: 0;
      }
    }
  }
  .login-body {
    text-align: center;
    padding: 30px 15px;

    .login-form {
      /*width: 250px;*/
      margin: 0 auto;
      text-align: left;

      .form-item {
        margin: 24px auto 0;
      }
      input {
        border: none;
      }
      .ivu-input-group-append,
      .ivu-input-group-prepend {
        background: #fff;
        border: none;
      }
    }

    .notice-text {
      display: inline-block;
      margin-top: 20px;
      width: 100%;
      color: #fff;
      text-align: left;
    }
  }

  .login-footer {
    padding: 12px 15px;
    text-align: right;
  }

  input {
    // 解决chrome下表单自动填充导致的input框黄底问题
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
    }
  }
}
</style>
