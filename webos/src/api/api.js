/* 
 * 接口统一集成模块
 */
import * as login from './moudules/login'
import * as application from './moudules/application'
import * as platform from './moudules/platform'

// 默认全部导出
export default {
    login,
    application,
    platform
}