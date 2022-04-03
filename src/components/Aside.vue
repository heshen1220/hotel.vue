<template>
    <el-menu :default-openeds="['1', '3']" style="height: 100%;overflow-x: hidden"
             background-color="rgb(48,68,86)"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse-transition="false"
             :collapse="isCollapse"
             router
    >

        <div style="height: 60px;line-height: 60px; text-align: center">
            <img src="../assets/logo.png" alt=""
                 style="width: 20px ;position: relative; top:5px ;margin-right:5px">
            <b style="color: white" v-show="logTextShow">后台管理系统</b>
        </div>

            <el-menu-item index="/Information">
                <template slot="title"><i class="el-icon-office-building"></i>
                  <span slot="title"> 酒店信息</span>
                </template>
            </el-menu-item>
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-home"></i>
                <span slot="title"> 客房管理</span>
            </template>
            <el-menu-item index="/Room">房间管理</el-menu-item>
            <el-menu-item index="/RoomType">房间类型</el-menu-item>
            <el-menu-item index="/TypeIllustration">统计图示</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>
                <span slot="title">预定管理</span>
            </template>
                <el-menu-item index="/BookOrder">订单日志</el-menu-item>
                <el-menu-item index="/OrderAnalysis">订单分析</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-s-check"></i>
                <span slot="title">接待管理</span>
            </template>
              <el-menu-item index="/CheckIn">客户住房</el-menu-item>
            <el-menu-item index="/CheckOut">客户退房</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title"><i class="el-icon-s-custom"></i>
                <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="/Users">用户管理</el-menu-item>
            <el-menu-item index="">角色管理</el-menu-item>
        </el-submenu>
      <el-menu-item index="/Order">
        <template slot="title"><i class="el-icon-s-order"></i>
          <span slot="title"> 账单统计</span>
        </template>
      </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "Aside",
        props:{
            isCollapse: Boolean,
            logTextShow: Boolean
        }
    }
</script>

<style scoped>

</style>