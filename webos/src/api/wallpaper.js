
let bingApi = 'http://cn.bing.com/HPImageArchive.aspx'

//http://cn.bing.com/HPImageArchive.aspx?idx=1&n=1 将要得到昨天的图片
//http://cn.bing.com/HPImageArchive.aspx?idx=2&n=1得到前天的图片
export default {
    // 获取bing壁纸
    //data:    format: "js",idx 可选值 -1 || 1 ~ 16 n 最大为8
    getBingWallpaper: async (data) => {
        let res = await axios.get(bingApi, {
            params: data
        })
        return res
    }
}