/*
 * @Author: guk 
 * @Date: 2019-07-12 10:02:44 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-12 11:18:41
 * 应用市场相关
 */

import axios from '@/utils/axios'
import config from '@/utils/config';

export const marketApi = {
  // 获取应用分类列表
  getCategoryList: async (data) => {
    return axios({
        url: config.baseUrl + '/api/ApplicationMarket/category/list',
        method: 'post',
        data
    })
  },
  // 获取应用列表
  getApplicationList: async (data) => {
    return axios({
        url: config.baseUrl + '/api/ApplicationMarket/application/list',
        method: 'post',
        data
    })
  }
}
