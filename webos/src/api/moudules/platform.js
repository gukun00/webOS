import axios from '../../utils/axios'
import config from '../../utils/config';

/* 
 * app安装卸载
 */

// 安装
export const doInstall = data => {
    return axios({
        url: config.baseUrl + '/api/Platform/user/application/install',
        method: 'post',
        data
    })
}

// 卸载
export const doUnInstall = data => {
    return axios({
        url: config.baseUrl + '/api/Platform/user/application/uninstall',
        method: 'post',
        data
    })
}


