/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-07-07 19:29:33 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-09 19:44:48
 */


<style lang="less" rel="stylesheet/less">
html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
body {
  font-size: 12px;
  line-height: 1.5;
  color: #515a6e;
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
    <router-view />
  </transition>
</template>

<script>
export default {
  name: "App",
  created() {
    //获取壁纸
    this.getWallPapers();
  },
  methods: {
    getWallPapers() {
      let wallpaper = {};
      let defaultSrc = "./assets/win7/wallpaper.jpg";
      wallpaper["type"] = "images";
      wallpaper["src"] = defaultSrc;
      // 处理样式
      wallpaper["style"] = {
        background:
          "url(" + defaultSrc + ") center center / cover no-repeat fixed"
      };
      // 分发mutations，更新当前的壁纸信息
      this.$store.commit("currentWallpaper/update", wallpaper);
    }
  }
};
</script>
