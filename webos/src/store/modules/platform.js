export default {
  state: {
    appData: [],
    userInfo : {}
  },
  mutations: {
    updateAppData: (state, data) => {
      state.appData = data
    },
    updateOneAppData: (state, data) => {
      data.info.config.desktopIcon.style = data.style;
    },
    setUserInfo : (state,data) => {
      state.userInfo = data
    }
  }
}