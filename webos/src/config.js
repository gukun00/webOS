/*
 * @Author: guk 
 * @Date: 2019-07-06 14:16:28 
 * @Last Modified by:   guk 
 * @Last Modified time: 2019-07-06 14:16:28 
 */

// 服务配置
export const Serv = {
    //development: '//127.0.0.1:8012/api',
    // production: '//127.0.0.1:8012/api'
    development: '//10.6.32.37:8012/api',
    production: '//10.6.32.37:8012/api',
    //development: '//10.88.11.53:8012/api',
    //production: '//10.88.11.53:8012/api'
    // development: '//10.88.11.53:8012/api/v3.0.1',
    // production: '//10.88.11.53:8012/api/v3.0.1'
    // production: '//x-webdesktop-api-koa.herokuapp.com/api/v2.0.0'
  }
  
  // cookie相关配置
  export const Cookie = {
    prefix: 'x-',
    keys: {
      account: 'account',
      token: 'key',
      userType: 'user-type',
      userCode: 'user-code'
    },
    getItem: function (key) {
      return key ? this.prefix + this.keys[key] : ''
    },
    path: {
      development: '/',
      production: '/'
    }
  }
  
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
    logo: './assets/logo_empowerx.png',
    copyright: '© 2018 - 2019 SCIYON'
  }
  