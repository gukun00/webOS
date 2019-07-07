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
import Login from "@/views/Login";

export default {
  name: "App",
  components: {
    Login
  },
  created() {
    //获取壁纸
    this.getWallPapers();
  },
  methods: {
    getWallPapers() {
      let wallpaper = {};
      let defaultSrc = "/assets/win7/wallpaper.jpg";
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
