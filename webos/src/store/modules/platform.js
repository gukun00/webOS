export default {
  state: {
    appData: [],
    userInfo: {}
  },
  mutations: {
    updateAppData: (state, data) => {
      state.appData = data
    },
    updateOneAppIconStyle: (state, data) => {
      data.info.config.desktopIcon.style = data.style;
    },
    updateOneAppStyle: (state, data) => {
      data.info.config.style = data.style;
    },
    setUserInfo: (state, data) => {
      state.userInfo = data
    }
  }
}