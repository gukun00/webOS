/*
 * @Author: guk 
 * @Date: 2019-07-10 15:22:47 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-15 17:18:34
 * 窗口
 */


export default {
    state: {
        //appInfo,window(status,)
        desktopWindows: [],
        installInfo : null
    },
    mutations: {
        'updateInstallInfo' : (state, data) => {
            state.installInfo = data
        },
        'closeInstallWin' : (state, data) => {
            state.installInfo = null;
        },
        'updateWindows': (state, data) => {
            state.desktopWindows = data
        },
        'updateOneWindowStyle': (state, data) => {
            data.info.window.style = data.style 
            //记录大小
            data.info.window.customStyle = data.style;
        },
        'updateOneWindow': (state, data) => {
            state.desktopWindows.forEach(element => {
                if (element.key === data.key) {
                    element.window = data.window;
                }
            });
        },
        //这边是独立打开的，一个app只能打开一个窗口
        'openWindow': (state, data) => {
            //先查看是否有该应用了
            let hasWin = false;
            state.desktopWindows.forEach(element => {
                //这边不比较key
                if (element.appInfo.appId === data.appInfo.appId) {
                    element.window.status = "open";
                    if(element.window.size == "min"){
                        element.window.size = element.window.oldSize;
                        
                        if(element.window.oldSize != "max" && element.window.oldSize != "full"){
                            element.window.style = element.window.customStyle;
                        }
                    }
                 
                    hasWin = true;
                    return;
                }
            });
            //新打开，记录一下大小
            if (!hasWin) {
                let win = {
                    key : data.appInfo.appId + new Date().valueOf(),
                    appInfo: data.appInfo,
                    //这边是window的信息
                    window: JSON.parse(JSON.stringify(data.appInfo.config.window))
                }

                win.window.status = "open";
                win.window.customStyle = data.appInfo.config.window.style;
                state.desktopWindows.push(win);
            }
        }
    }
}