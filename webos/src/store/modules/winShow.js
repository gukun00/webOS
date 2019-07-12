/*
 * @Author: guk 
 * @Date: 2019-07-10 15:22:47 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-12 17:48:04
 * 窗口
 */


export default {
    state: {
        //appInfo,window(status,)
        desktopWindows: []
    },
    mutations: {
        'updateWindows': (state, data) => {
            state.desktopWindows = data
        },
        'updateOneWindow': (state, data) => {
            data.info.window.style = data.style 
        },
        'openWindow': (state, data) => {
            //先查看是否有该应用了
            let hasWin = false;
            state.desktopWindows.forEach(element => {
                if (element.appInfo.appId === data.appInfo.appId) {
                    element.appInfo.config.window.status = "open";
                    hasWin = true;
                    return;
                }
            });

            if (!hasWin) {
                let win = {
                    appInfo: data.appInfo,
                    //这边是window的信息
                    window: JSON.parse(JSON.stringify(data.appInfo.config.window))
                }

                data.appInfo.config.window.status = "open";
                state.desktopWindows.push(win);
            }
        }
    }
}