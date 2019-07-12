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
        bottom: "42px"
    },
    min: {
        width: 0,
        height: 0,
        top: "100%"
    }
}


export function handleResizeByWindowBar(data) {
    let {
        appInfo,
        action,
        appData
    } = data
    if (!Object.keys(appInfo).length || !appInfo.config.window) {
        return
    }
    console.log(action);
    // 回调操作
    let callback = null

    let currentStyle = JSON.parse(JSON.stringify(appInfo.config['window']['style'] || {}))
    let currentSize = appInfo.config['window']['size']
    let oldStyle = JSON.parse(JSON.stringify(appInfo.config['window']['oldStyle'] || {}))
    let oldSize = appInfo.config['window']['oldSize']
    //需要改变的
    var tempAppInfo = JSON.parse(JSON.stringify(appInfo));

    switch (action) {
        case 'min':
            // 备份旧style/size
            tempAppInfo.config['window']['oldStyle'] = currentStyle
            tempAppInfo.config['window']['oldSize'] = currentSize
            // 将当前窗口最小化
            tempAppInfo.config['window']['style'] = windowStyleBySize['min']
            tempAppInfo.config['window']['size'] = 'min'
            //TODO taskBar处理
            //let taskBarList = findAllIndex(appData, (item) => item.config.window.status === 'open' || item.config.taskBar.isPinned)
            // if (taskBarList.length) {
            //     let taskBarIndex = taskBarList.indexOf(currentAppIndex)
            //     // FIXME 每个任务栏图标实际宽度 62px
            //     tempAppInfo.config['window']['style'] = {
            //         ...tempAppInfo.config['window']['style'],
            //         left: 62 * (taskBarIndex + 1) + 'px'
            //     }
            // }
            break
        case 'reset':
            // 备份旧style/size
            // 还原窗口旧样式
            if (oldSize === 'max') {
                tempAppInfo.config['window']['style'] = appInfo.config['window']['style'] || {}
                tempAppInfo.config['window']['size'] = appInfo.config['window']['size']
                tempAppInfo.config['window']['style'] = {
                    "z-index": 2000,
                    ...JSON.parse(JSON.stringify(tempAppInfo.config['window']['style'])),
                    ...windowStyleBySize[tempAppInfo.config['window']['size']]
                }
            } else {
                tempAppInfo.config['window']['style'] = oldStyle
                tempAppInfo.config['window']['size'] = oldSize
            }
            // 备份旧style/size
            if (currentSize != "max") {
                tempAppInfo.config['window']['oldStyle'] = currentStyle
                tempAppInfo.config['window']['oldSize'] = currentSize
            }
            break
        case 'max':
            // 备份旧style/size
            tempAppInfo.config['window']['oldStyle'] = currentStyle
            tempAppInfo.config['window']['oldSize'] = currentSize
            // 将当前窗口最大化
            tempAppInfo.config['window']['style'] = {
                ...currentStyle,
                ...windowStyleBySize['max']
            }
            tempAppInfo.config['window']['size'] = 'max'
            break
        case 'full':
            if (currentSize != "max") {
                tempAppInfo.config['window']['size'] = 'max'
                //备份样式
                tempAppInfo.config['window']['oldStyle'] = currentStyle
                tempAppInfo.config['window']['oldSize'] = currentSize
            }
            // 将当前窗口最大化
            tempAppInfo.config['window']['style'] = {
                ...currentStyle,
                ...windowStyleBySize['full']
            }
            break
        case 'restore':
            // 当前窗口退出最大化
            tempAppInfo.config['window']['style'] = {
                ...currentStyle,
                ...windowStyleBySize['max']
            }
            // tempAppInfo.config['window']['size'] = 'max'
            break
        case 'close':
            // 如果是安装/卸载窗口的关闭操作则从appData中移除
            if (tempAppInfo.hasOwnProperty('action') && ['install', 'uninstall'].includes(tempAppInfo.action)) {
                if (tempAppInfo.hasOwnProperty('installed') && tempAppInfo.installed) {
                    //appData = appData.map(item => {
                    //if (item.config.app.name === appInfo.config.app.name) {
                    delete tempAppInfo.action
                    delete tempAppInfo.installed
                    // let _itemIndex = findAppIndex(_t._appData.appData, (item) => item.config.app.name === appInfo.config.app.name)
                    // let _item = _t._appData.appData[_itemIndex]
                    // tempAppInfo.config.window = {
                    //     ..._item.config.window
                    // }
                    //}
                    //return item
                    //})
                } else {
                    //appData = appData.filter(item => item.config.app.name !== appInfo.config.app.name)
                }
            } else {
                tempAppInfo.config['window']['status'] = 'close'
                // 初始化size/style
                // tempAppInfo.config['window']['style'] = _t._appData.tempAppInfo ? _t._appData.tempAppInfo.config['window']['style'] : {}
                // tempAppInfo.config['window']['size'] = _t._appData.tempAppInfo ? _t._appData.tempAppInfo.config['window']['size'] : ''
                tempAppInfo.config['window']['oldStyle'] = {}
                tempAppInfo.config['window']['oldSize'] = ''
            }
            // let index = findAppIndex(_t.appData.taskappData, (item) => item.config.app.name === appInfo.config.app.name)
            // if (index >= 0) {
            //   _t.appData.taskappData.splice(index, 1);
            // }
           // _t.appData.taskappData = _t.appData.taskappData.filter(item => item.config.app.name !== appInfo.config.app.name)
            break
    }

    this.$store.commit("updateOneAppStyle", {
        ..._t.appData,
        appData: appData
    })
    callback && callback()
}