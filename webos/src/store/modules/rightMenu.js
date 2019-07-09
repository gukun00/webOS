export default {
  state: {
    contextMenuInfo: {
      x: 0,
      y: 0,
      isShow: false,
      list : []
    }
  },
  mutations: {
    updateMenuItems: (state, data) => {
      state.contextMenuInfo = data
    },
    toggleRightMenu: (state, data) => {
      state.contextMenuInfo.isShow = data
    }
  }
}