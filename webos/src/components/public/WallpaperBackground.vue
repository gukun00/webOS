/*
 * @Author: guk 
 * @Date: 2019-07-06 14:46:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-07 18:53:47
 * 磨砂壁纸背景
 */

<style scoped lang="less" rel="stylesheet/less">
.wallpaper-image {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(5px);
  margin: -30px;
  z-index: -1;
}
</style>

<template>
  <div
    class="wallpaper-image"
    :style=" (currentWallpaper && currentWallpaper.type) === 'images' ? currentWallpaper.style : ''"
  ></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "WallpaperBackground",
  computed: {
    ...mapState({
      currentWallpaper: state => state.wallpaper.currentWallpaper
    })
  }
};
</script>
