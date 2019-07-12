import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入 cookie插件
import * as Cookies from 'js-cookie'
import router from './router'


// 注册全局组件
import globalComponents from './global/components'
globalComponents.register(Vue)

//import '../public/assets/antd-iconfont/iconfont.css'
import '../public/assets/global-iconfont/iconfont.css'
import '../public/assets/sciyon-iconfont/iconfont.css'
Vue.config.productionTip = false


import XDrag from './global/directives/XDrag'
Vue.use(XDrag)

// 注册全局 Cookies
Vue.prototype.$Cookies = Cookies
// 注册全局 utils
import api from './api'
import store from './store'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(ElementUI)
Vue.use(api)

Vue.prototype.$message({
  duration: 3
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')