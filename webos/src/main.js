import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入 cookie插件
import * as Cookies from 'js-cookie'
import router from './router'
import '../public/assets/antd-iconfont/iconfont.css'
import '../public/assets/sciyon-iconfont/iconfont.css'
Vue.config.productionTip = false

// 注册全局 Cookies
Vue.prototype.$Cookies = Cookies
// 注册全局 utils
import api from './api'
import store from './store'


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