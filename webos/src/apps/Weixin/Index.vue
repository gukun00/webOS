/**
* Created by Sciyon on 2017/12/24.
*
* 入口文件
*/

<style scoped lang="less" rel="stylesheet/less">
  .app-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #ffffff;
  }
</style>

<template>
  <div class="app-main">
    <MainPage :info="info"></MainPage>
  </div>
</template>

<script>
  import MainPage from './pages/MainPage.vue'

  export default {
    name: 'Weixin',
    components: {
      MainPage
    },
    props: {
      info: {
        type: Object
      }
    },
    created: function () {
      let _t = this
      // 将store注册到apps下
      _t.$store.registerModule(['Apps', Store.moduleName], Store.store)
    },
    destroyed: function () {
      let _t = this
      // 卸载store
      _t.$store.unregisterModule(['Apps', Store.moduleName])
    }
  }
</script>
