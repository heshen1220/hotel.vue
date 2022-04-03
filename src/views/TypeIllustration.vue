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
          let option ={
            title: {
              text: '统计图示'
            },
            tooltip: {},
            xAxis: {
              data: ['商务单人间' ,'大床房', "家庭房",'标准间',"豪华客房",'麻将房']
            },
            yAxis: {},
            series: [
              {
                name: "拥有数量",
                type: 'bar',
                data: []
              },
              {
                name: "可用数量",
                type: 'bar',
                data: []
              }
            ]
          };
          let charDom =document.getElementById("main");
          let myChart = echarts.init(charDom);

          this.request.get("/example").then(res =>{
            option.series[0].data=res.result.y
            option.series[1].data=res.result.z
            myChart.setOption(option);
          })
        }
    }
</script>

<style scoped>

</style>