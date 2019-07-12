/*
 * @Author: guk 
 * @Date: 2019-07-12 09:33:19 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-12 10:14:13
 * 应用市场app入口文件
 */


<template>
  <div class="app-main">
    <MainPage></MainPage>
  </div>
</template>

<script>
  import MainPage from './pages/MainPage.vue'

  export default {
    name: 'ApplicationMarket',
    components: {
      MainPage
    },
    created: function () {

    },
    destroyed: function () {

    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .app-main {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #ffffff;
  }
</style>


