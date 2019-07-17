/**
* Created by Sciyon on 2017/12/24.
*
* 入口文件
*/

<style scoped lang="less" rel="stylesheet/less">
  .app-main {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #ffffff;
  }
</style>

<template>
  <div class="app-main">
    <MainPage></MainPage>
  </div>
</template>

<script>
  import MainPage from './pages/MainPage.vue'

  export default {
    name: 'Weather',
    components: {
      MainPage
    },
    created: function () {

    },
    destroyed: function () {

    }
  }
</script>
