import axios from '../../utils/axios'
import config from '../../utils/config';

/* 
 * 系统登录模块
 */

// 登录
export const login = data => {
    return axios({
        url: config.baseUrl + '/api/sys/login',
        method: 'post',
        data
    })
}

// 登出
export const logout = () => {
    return axios({
        url: config.baseUrl + '/logout',
        method: 'get'
    })
}