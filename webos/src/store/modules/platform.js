export default {
  state: {
    appData: []
  },
  mutations: {
    updateAppData: (state, data) => {
      state.appData = data
    },
    updateOneAppData: (state, data) => {
      // for (let i = 0, len = state.appData.length; i < len; i++) {
      //   if (state.appData[i].appId === data.appId) {
      //     state.appData[i] = data;
      //   }
      // }
      console.log(data.style)
      data.info.config.desktopIcon.style = data.style;
    }
  }
}