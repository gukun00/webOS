/*
 * @Author: guk 
 * @Date: 2019-07-10 10:42:06 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-10 14:24:47
 * 
 */


<template>
  <div class="app-task-bar-icon-box">
    <TaskBarIcon v-for="item in appData" :key="item.id" :info="item" type="app"></TaskBarIcon>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TaskBarIcon from './TaskBarIcon'

  export default {
    name: 'TaskBarIconBox',
    components: {
      TaskBarIcon
    },
    computed: {
      ...mapState({
        appData: state => state.platform.appData
      })
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .app-task-bar-icon-box {
    position: absolute;
    bottom: 0;
    z-index: 5020;
    /*width: 100%;*/
    height: 100%;
    display: inline-block;
    // #0E2E49
    /*border-top: 1px solid rgba(14, 46, 73, .3);*/
    box-sizing: content-box;
  }
</style>