/*
 * @Author: guk 
 * @Date: 2019-07-08 16:38:16 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-08 17:05:42
 * 桌面壁纸
 */


<template>
  <div class="wallpaper">
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <!-- 图片背景 -->
      <div
        class="wallpaper-images"
        v-if="currentWallpaper.type === 'images'"
        :style="currentWallpaper.style"
      ></div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Wallpaper",
  props: {
    // 切换方式: random || win7 || images || components || bing || all
    switchType: {
      type: String,
      default: "win7"
    }
  },
  data() {
    return {
      wallpaperList: {
        // win7风格壁纸
        win7: ["./assets/win7/wallpaper.jpg"],
        // 图片壁纸路径列表
        // FIXME 列表应该通过用户配置获得
        images: [
          // './static/wallpaper/bg_0001.jpg',
          // './static/wallpaper/bg_0002.jpg',
          // './static/wallpaper/bg_0003.jpg'
        ],
        // 组件壁纸 组件名称列表
        components: ["RainDay"]
      }
    };
  },
  computed: {
    ...mapState({
      currentWallpaper: state => state.wallpaper.currentWallpaper
    })
  },
  methods: {
    init: function() {
      let _t = this;
      // 切换壁纸
      _t.doSwitch();
    },
    doSwitch: function() {
      switch (this.switchType) {
        case "random":
          //TODO 随机壁纸
          break;
        case "win7":
          //win7壁纸
          this.lazyLoadImg(this.win7);
          break;
        case "images":
        case "bing":
          this.doSwitchByBing();
          break;
      }
    },
    // 切换bing壁纸
    doSwitchByBing: async function() {
      // 1.获取bing壁纸
      let src = await this.getBingWallpaper();
      if (src) {
        // 渐进加载
        this.lazyLoadImg(src);
      }
    },
    getBingWallpaper: async function() {
      let _t = this;
      let dayIndex = Math.floor(Math.random() * 17);
      // 分发action，执行保存
      let res = await _t.$store.dispatch(
        _t.$utils.store.getType("Wallpaper/bing", "Platform"),
        {
          format: "js",
          // idx 可选值 -1 || 1 ~ 16
          idx: dayIndex,
          // n 最大为8
          n: 8
        }
      );
      if (!res) {
        _t.$Message.error("获取壁纸失败！");
        return null;
      } else if (res.code !== "OK") {
        return null;
      }
      // 处理返回数据
      if (res) {
        _t.$Message.success("获取壁纸成功！");
        try {
          // 解析壁纸数据
          let wallpaperData = res.data.images;
          // 随机一条数据
          let srcIndex = Math.floor(Math.random() * wallpaperData.length);
          // 拼装地址
          let baseUrl = "//cn.bing.com";
          let wallpaperUrl = wallpaperData[srcIndex].url;
          return baseUrl + wallpaperUrl;
        } catch (err) {
          _t.doSwitchByRandom();
          return null;
        }
      }
    },
    lazyLoadImg: function(src) {
      let _t = this;
      // 渐进加载
      let img = new Image();
      img.src = src;
      img.onload = function() {
        let wallpaper = {
          type: "images",
          src: src,
          style: {
            background: "url(" + src + ") left top / cover no-repeat fixed"
          }
        };
        // 分发mutations，更新当前的壁纸信息
        _t.$store.commit("currentWallpaper/update", wallpaper);
      };
    }
  },
  created: function() {
    let _t = this;
    // 初始化
    _t.init();
  },
  mounted: function() {},
  beforeDestroy: function() {
    let _t = this;
    _t.$utils.bus.$off(["platform/wallpaper/switch"]);
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
.wallpaper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .wallpaper-images {
    width: 100%;
    height: 100%;
    transition: background-image 1s ease-in-out 0s;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .wallpaper-components {
    width: 100%;
    height: 100%;
  }
}
</style>
