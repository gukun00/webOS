
import { baseUrl } from '@/utils/global'


// 系统配置
export const System = {
  author: 'SCIYON',
  repository: {
    type: 'github',
    url: 'http://www.sciyon.com'
  },
  version: '3.0.1',
  name: 'EmpowerX',
  title: 'EmpowerX',
  subtitle: 'EmpowerX',
  logo: './logo_empowerx.png',
  copyright: '© 2018 - 2019 SCIYON'
}


export default {
  method: 'get',
  // 基础url前缀
  baseUrl: baseUrl,
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json',
  System
}