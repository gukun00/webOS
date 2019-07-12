import NoData from './NoData.vue'
import RainDay from './RainDay.vue'
import USwitch from './Switch.vue'
import UPanel from './UPanel.vue'
import HighLight from './HighLight.vue'
import WallpaperBackground from './WallpaperBackground.vue'

export default {
  components: {
    NoData,
    RainDay,
    USwitch,
    UPanel,
    HighLight,
    WallpaperBackground
  },
  // 注册全局组件
  register: function (Vue) {
    let _t = this
    let components = _t.components
    for (let key in components) {
      if (key && components[key]) {
        Vue.component(key, components[key])
      }
    }
  }
}