<template>
  <div align="center">>
    <h2>酒店管理系统</h2>
  <h1>实现功能:</h1>
    <div>客房管理、预定管理、接待管理、权限管理、账单统计</div>
    <h1>技术方案:</h1>
    <div>采用传统B/S架构，遵循MVC架构模式，拟用Java语言进行开发，服务端主要开发框架采用SpringBoot+MyBatis。</div>
    <div>前端:由HTML、CSS、javascript来进行前端页面的构成，使用VUE、Element ui、ECharts来简化页面开发及美化页面布局处理。</div>
    <div>关系型数据库使用MySQL，用户密码加密方式采用SHA-256哈希函数。</div>
    <div>前台、管理人员认证鉴权采用JWT框架，使用IP地址对Token进行加盐。</div>
    <div>单元测试与接口测试分别采用JUnit与PostMan。</div>
    <h1>开发工具：</h1>
    <div>IntelliJ IDEA、Git、Maven、SQLyog、PostMan</div>
    <h1>开发环境：</h1>
    <div>系统环境：Windows</div>
    <div>Java版本：JDK1.8</div>
    <div>Node.js版本：16.14.2</div>
    <div>服务器版本：Tomcat 9.0.41</div>
    <div>数据库版本：MySQL 8.0.28</div>
    <h1>开发人员:</h1>
    <div>学号：2018090237 姓名：田园居</div>
    <h1>开发周期:</h1>
    <div>2022-03-13——2022-04-05</div>
  </div>
</template>

<script>
    export default {
      name: "Xinxi",
      created() {
        this.load()
      },
      methods: {
        load() {
          this.request.get("/login").then(res => {
            if (res.code == "401") {
              this.$message.error("请先登录！")
              this.$router.push("/login")
            }
          })
        }
      }
    }

</script>

<style scoped>

</style>