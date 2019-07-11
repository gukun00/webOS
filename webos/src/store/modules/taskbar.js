export default {
    state: {
      startMenuShow: false
    },
    mutations: {
      toggleStartMenuShow: (state, data) => {
        state.startMenuShow = data
      }
    }
  }