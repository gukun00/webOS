import axios from '../../utils/axios'
import config from '../../utils/config';

/* 
 * 系统登录模块
 */

// 登录
export const getApplicationListByUserId = data => {
    return axios({
        url: config.baseUrl + '/api/Platform/user/application/list',
        method: 'get',
        params : data
    })
}

