import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as Config from './config'
// 导入 cookie插件
import * as Cookies from 'js-cookie'

Vue.config.productionTip = false

// 注册全局 Cookies
Vue.prototype.$Cookies = Cookies
// 注册全局 utils
//Vue.prototype.$utils = utils
// 注册全局 config
Vue.prototype.$Config = Config
import api from './api'
import store from './store'


Vue.use(ElementUI)
Vue.use(api)

Vue.prototype.$message({
  duration: 3
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')