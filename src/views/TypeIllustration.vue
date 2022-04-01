<template>
    <div id="main" style="width:100%;height:100%"></div>

</template>

<script>
    import * as echarts from 'echarts'
    export default {
        name: "TypeIllustration.vue",
        data() {
            return {}
        },
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
        },
      },
        mounted() {
          let myChart = echarts.init(document.getElementById('main'));
          myChart.setOption({
            title: {
              text: '统计图示'
            },
            tooltip: {},
            xAxis: {
              data: ['标准间', '麻将房', '大床房', '家庭房', '豪华客房', '商务单人间']
            },
            yAxis: {},
            series: [
              {
                name: "拥有数量",
                type: 'bar',
                data: [14, 3, 6, 2, 2, 4]
              },
              {
                name: "可用数量",
                type: 'bar',
                data: [6, 2, 5, 1, 1, 2]
              }
            ]
          })
        },
    }
</script>

<style scoped>

</style>