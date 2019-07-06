/**
* Created by Sciyon on 2017/12/24.
*
*/

<style lang="less" rel="stylesheet/less">
html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  cursor: default;
  user-select: none;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <Login></Login>
  </transition>
</template>

<script>
import Login from "./components/login/Login";

export default {
  name: "App",
  components: {
    Login
  }
};
</script>
