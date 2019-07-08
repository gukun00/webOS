import axios from '../axios'
import config from '../config';

/* 
 * 系统登录模块
 */

// 登录
export const getApplicationListByUserId = data => {
    return axios({
        url: config.baseUrl + '/api/platform/user/application/list',
        method: 'get',
        data
    })
}

