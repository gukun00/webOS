var windowStyleBySize = {
    small: {
        width: "300px",
        height: "200px",
        left: "calc(50% - 150px)",
        top: "calc(50% - 100px)"
    },
    middle: {
        width: "800px",
        height: "600px",
        left: "calc(50% - 400px)",
        top: "calc(50% - 300px)"
    },
    max: {
        left: 0,
        top: 0,
        right: 0,
        bottom: "42px",
        width: "",
        height: "",
    },
    min: {
        width: 0,
        height: 0,
        top: "100%"
    },
    full: {
        left: 0,
        top: 0,
        right: 0,
        bottom: "42px",
        width: "",
        height: "",
    },
}


export function handleResizeByWindowBar(data, callback) {

    let winInfo = data.winInfo;
    let appInfo = data.winInfo.appInfo;
    let action = data.action;

    if (!Object.keys(appInfo).length || !appInfo.config.window) {
        return
    }

    let currentStyle = JSON.parse(JSON.stringify(winInfo.window['style'] || {}))
    let currentSize = winInfo.window['size']
    let oldStyle = JSON.parse(JSON.stringify(winInfo.window['oldStyle'] || {}))
    let oldSize = winInfo.window['oldSize']
    //需要改变的
    var tempWindow = JSON.parse(JSON.stringify(winInfo.window));

    switch (action) {
        case 'min':
            // 备份旧style/size
            //最小化的时候不用存style
            //tempWindow['oldStyle'] = currentStyle
            tempWindow['oldSize'] = currentSize
            // 将当前窗口最小化
            tempWindow['style'] = windowStyleBySize['min']
            tempWindow['size'] = 'min'
            break
        case 'reset':
            // 又max回来了
            tempWindow['oldSize'] = currentSize
            tempWindow['size'] =  appInfo.config['window']['size'];
            tempWindow['style'] = tempWindow['customStyle']
            break
        case 'max':
            // 备份旧style/size
            //最大化的时候存一下当前尺寸
            tempWindow['oldSize'] = currentSize
            // 将当前窗口最大化
            tempWindow['style'] = {
                ...currentStyle,
                ...windowStyleBySize['max']
            }
            tempWindow['size'] = 'max'
            break
        case 'full':
            if (currentSize != "max") {
                tempWindow['size'] = 'max'
                //备份样式
                tempWindow['oldSize'] = currentSize
            }
            // 将当前窗口最大化
            tempWindow['style'] = {
                ...currentStyle,
                ...windowStyleBySize['full']
            }
            break
        case 'restore':
            // 当前窗口退出最大化
            tempWindow['style'] = {
                ...currentStyle,
                ...windowStyleBySize['max']
            }
            // tempWindow['size'] = 'max'
            break
        case 'close':
            // 如果是安装/卸载窗口的关闭操作则从appData中移除
            tempWindow['status'] = 'close'
            // tempWindow['size'] = appInfo.config.window.size;
            // tempWindow['style'] = appInfo.config.window.style;
            // tempWindow['oldStyle'] = appInfo.config.window.style;
            // tempWindow['oldSize'] = appInfo.config.window.size;

            break
    }

    callback && callback({
        window: tempWindow
    })
}