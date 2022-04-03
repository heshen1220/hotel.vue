<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 40px">
      <el-col :span="8">
        <el-card style="color: #409EFF">
        <div>月内订单数量</div>
        <div style="padding: 10px 0;text-align: center;font-weight: bold">
          {{order}}
        </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="color: #F56C6C">
          <div>月内销售总额</div>
          <div style="padding: 10px 0;text-align: center;font-weight: bold">
            {{ sale }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="color: #E6A23C">
          <div>管理员数量</div>
          <div style="padding: 10px 0;text-align: center;font-weight: bold">
            {{ administrators }}
          </div>
        </el-card>
      </el-col>
    </el-row>
      <div id="main" style="width: 100%;height: 700px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "Order.vue",
  data() {
    return {
      order:"",
      sale:"",
      administrators:""
    }
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
      this.request.get("/administrators").then(res => {
        this.administrators=res.result
      })
    }
  },
  mounted() {
    let option ={
      title: {
        text: '月内接待图示'
      },
      tooltip: {},
      xAxis: {
        data: ['一号', '二号','三号', '四号','五号', '六号','七号', '八号','九号', '十号','十一号', '十二号',
          '十三号', '十四号','十五号','十六号', '十七号','十八号', '十九号','二十号', '二十一号', '二十二号',
          '二十三号','二十四号', '二十五号', '二十六号','二十七号', '二十八号','二十九号', '三十号','三十一号']
      },
      yAxis: {},
      series: [
        {
          name: "接待人数",
          type: 'line',
          data: []
        }
      ]
    };
    let charDom =document.getElementById("main");
    let myChart = echarts.init(charDom);

    this.request.get("/orderChart").then(res =>{
      option.series[0].data=res.result.x
      this.order=res.result.t
      this.sale=res.result.p
      myChart.setOption(option);
    })
  },
}
</script>


<style scoped>

</style>