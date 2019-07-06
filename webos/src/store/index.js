import state from './state'
import actions from './actions'
import mutations from './mutations'
import wallpaper from './modules/wallpaper'

const debug = process.env.NODE_ENV !== 'production'

export default {
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
}

// export default new Vuex.Store({
//   modules: {
//     cart,
//     products
//   },
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
// })