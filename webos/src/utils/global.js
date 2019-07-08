/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
//export const baseUrl = 'http://localhost:8001'
//export const baseUrl = 'http://111.230.253.57:3000/mock/27/webos'
export const baseUrl = 'http://10.6.32.37:3000/mock/39/webos'
// 系统数据备份还原服务器地址
//export const backupBaseUrl = 'http://localhost:8002'
export const backupBaseUrl = 'http://localhost:8002'

export default {
    baseUrl,
    backupBaseUrl
}