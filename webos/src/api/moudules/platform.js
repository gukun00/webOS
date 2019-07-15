import axios from '../../utils/axios'
import config from '../../utils/config';

/* 
 * 系统登录模块
 */

// 登录
export const doInstall = data => {
    console.log(data,"123123123")
    return axios({
        url: config.baseUrl + '/api/Platform/user/application/install',
        method: 'post',
        data
    })
}

