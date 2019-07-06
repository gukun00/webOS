import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import axios from 'axios'
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


// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: process && process.env.NODE_ENV !== 'production' ? Config.Serv.development : Config.Serv.production,
  withCredentials: true
})
// 设置 axiosInstance 拦截器
axiosInstance.interceptors.request.use((config) => {
  // loading 进度条启动
  Vue.prototype.$Loading.start()
  let key = Config.Cookie.getItem('token')
  let val = Cookies.get(key) || ''
  // 设置请求头
  config.headers.common[key] = val
  return config
}, function (error) {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
  // loading 进度条关闭
  Vue.prototype.$Loading.finish()
  // 返回数据
  let resData = response && response.data ? response.data : response
  if (resData) {
    // 弹窗提示
    if (resData.code !== "OK") {
      Vue.prototype.$message.error(response.msg || resData.msg || '请求异常，请检查上送、返回。')
      if (resData.code === 9999) {
        // TODO 清空Session Storeage
        sessionStorage.clear()
        Object.keys(Cookies.get()).forEach(function (cookie) {
          Cookies.remove(cookie)
        })
        // TODO 跳转登录页
        setTimeout(function () {
          Vue.prototype.$nextTick(function () {
            // 清空用户登录信息
            storeInstance.commit(Vue.prototype.$utils.store.getType('userInfo/reset', 'Platform'))
          })
        }, 3000)
      }
      return Promise.reject(new Error(response.msg || resData.msg || '请求异常，请检查上送、返回。')).catch(function (result) {
        console.log(result)
      })
    }
  } else {
    Vue.prototype.$message.error('请求失败！')
    return Promise.reject(new Error('请求失败！')).catch(function (result) {
      console.log(result)
    })
  }
  return resData
}, function (error) {
  return Promise.reject(error)
})

// 注册 $http
Vue.prototype.$http = axiosInstance

Vue.use(ElementUI);
Vue.use(Vuex)

Vue.prototype.$message({
  duration: 3
})

new Vue({
  render: h => h(App),
}).$mount('#app')
