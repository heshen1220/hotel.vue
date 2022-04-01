<template>
    <div id="main" style="width:100%;height:100%"></div>
</template>

<script>
    import * as echarts from 'echarts'

    export default {
        name: "OrderAnalysis.vue",
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
        }
      },
        mounted() {
          let myChart = echarts.init(document.getElementById('main'));
          myChart.setOption({
            title: {
              text: '十五天内订单走向'
            },
            tooltip: {},
            xAxis: {
              data: ['一号', '三号', '五号', '七号', '九号', '十一号', '十三号', '十五号'
                , '十七号', '十九号', '二十一号', '二十三号', '二十五号', '二十七号', '二十九号', '三十一号']
            },
            yAxis: {},
            series: [
              {
                name: "预定人数",
                type: 'line',
                data: [3, 5, 8, 2, 4, 6, 5, 4, 9, 3, 5, 6, 5, 2, 7, 3]
              },
            ]
          })
        },
    }
</script>

<style scoped>

</style>