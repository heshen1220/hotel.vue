<template>
    <div style="line-height: 60px; display: flex">
        <div style="flex: 1">
            <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>
          <el-breadcrumb separator="/" style="display: inline-block;margin-left: 10px">
            <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <el-dropdown style="width: 100px;cursor: pointer">
          <div style="display: inline-block">
            <img src="../assets/河神.jpg" alt="" style="width:30px;border-radius: 50%;position: relative;top: 10px;right: 5px">
            <span>河神</span><i class="el-icon-arrow-down"></i>
          </div>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">个人信息</el-dropdown-item>
                <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                  <router-link to="/login" style="text-decoration: none"> 退出登录</router-link>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
          return{
            currentPathName: ''
          }
        },
      watch:{
          '$route':function () {
            this.currentPathName=localStorage.getItem("currentPathName")
          }
      },

        props: {
            collapseBtnClass: String,
            collapse: Boolean
        }
    }
</script>

<style scoped>

</style>