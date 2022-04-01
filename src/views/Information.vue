<template>
    <p>酒店信息</p>
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