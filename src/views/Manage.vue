<template>
    <div style="height: 100%">
        <el-container style="height: 100vh; border: 1px solid #eee">

            <el-aside width="sideWidth+'px'" style="background-color: rgb(238, 241, 246); height: 100%; ">
                <Aside :isCollapse="isCollapse" :logTextShow="logTextShow"></Aside>
            </el-aside>

            <el-container>

                <el-header style="border-bottom: 1px solid #cccccc">
                   <Header :collapse-btn-class="collapseBtnClass" :collapse="isCollapse"></Header>
                </el-header>

                <el-main>
                    <!--表示当前页面的子路由会在router-view里展示-->
                    <router-view/>
                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Aside from "../components/Aside";
    import Header from "../components/Header";
    export default {
        name: 'HomeView',
        data() {
            return {
                collapseBtnClass: 'el-icon-s-fold',
                isCollapse: false,
                sideWidth: 200,
                logTextShow: true
            }
        },
        components:{
            Aside,
            Header
        },
        methods: {
            collapse() {//点击收缩按钮触发
                this.isCollapse = !this.isCollapse
                if (this.isCollapse) {
                    this.collapseBtnClass = 'el-icon-s-unfold'
                    this.logTextShow = false
                } else {
                    this.collapseBtnClass = 'el-icon-s-fold'
                    this.logTextShow = true
                }
            },
        }
    }
</script>
