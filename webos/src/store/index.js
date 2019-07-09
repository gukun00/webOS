/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-07-07 11:11:14 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-09 18:00:42
 * 壁纸的
 */


import state from './state'
import actions from './actions'
import mutations from './mutations'
import wallpaper from './modules/wallpaper'
import platform from './modules/platform'
import rightMenu from './modules/rightMenu'
import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

const debug = process.env.NODE_ENV !== 'production'

const store = new vuex.Store({
    modules: {
        wallpaper,
        platform,
        rightMenu
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