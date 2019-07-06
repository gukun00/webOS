/*
 * @Author: guk 
 * @Date: 2019-07-06 15:13:27 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-06 16:06:49
 * 壁纸
 */

 
export default {
    currentWallpaper: {
      // 类别
      type: '',
      // 资源
      src: '',
      // 样式
      style: {}
    }
  }
  

const _wallpagers = [
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
  ]
  
  export default {
    getProducts (cb) {
      setTimeout(() => cb(_wallpagers), 100)
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
          ? cb()
          : errorCb()
      }, 100)
    }
  }