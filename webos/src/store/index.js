/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-07-07 11:11:14 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-07 11:43:09
 * 壁纸的
 */


import state from './state'
import actions from './actions'
import mutations from './mutations'
import wallpaper from './modules/wallpaper'
import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

const debug = process.env.NODE_ENV !== 'production'

const store = new vuex.Store({
    modules: {
        wallpaper
    },
    store: {
        namespaced: false,
        state,
        actions,
        mutations
    },
    strict: debug
})

export default store

// export default new Vuex.Store({
//   modules: {
//     cart,
//     products
//   },
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
// })