<template>
  <div>
    <el-card class="box-card" shadow="hover" header="用户信息" style="margin-top: 20px">
      <div class="text item">
        <el-row style="margin-top: 10px">
          <span style="font-size: 15px ;margin-left: 260px">姓名</span>
          <el-input style="width: 300px" placeholder="请输入姓名" class="ml-50"
                    v-model="name"></el-input>
          <span style="font-size: 15px" class="ml-50">手机号</span>
          <el-input style="width: 300px" placeholder="请输入手机号" class="ml-50"
                    v-model="phone"></el-input>
        </el-row>
        <el-row style="padding-top: 50px ;margin-left: 230px">
          <span style="font-size: 15px">证件类型</span>
          <el-select v-model="value" clearable placeholder="请选择" class="ml-50">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <span style="font-size: 15px ;margin-left: 125px">身份证号</span>
          <el-input style="width: 300px" placeholder="请输入身份证号" class="ml-50"
                    v-model="id"></el-input>
        </el-row>
        <el-row style="margin-top: 50px">
          <span style="font-size: 15px ;margin-left: 260px">地址</span>
          <el-input style="width: 300px" placeholder="请输入地址" class="ml-50"
                    v-model="address"></el-input>
          <span style="font-size: 15px" class="ml-50">备注</span>
          <el-input style="width: 300px ; padding-left:65px" placeholder="请输入备注"
                    v-model="userMemo"></el-input>
        </el-row>
      </div>
    </el-card>
    <el-row>
      <el-card style="width: 100%;height: 250px ; margin-top: 40px" header="住宿信息">
        <div style="padding: 18px 0" class="block">
          <!--        <p>组件值：{{ value }}</p>-->
          <el-row>
            <span style="font-size: 15px;margin-left: 180px">请选择起始时间</span>
            <el-date-picker
                style="margin-left: 50px"
                v-model="time"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            <span style="font-size: 15px;margin-left: 100px">房间号</span>
            <el-input style="width: 300px ; padding-left:50px" placeholder="请输入房间号"
                      v-model="room"></el-input>
          </el-row>
          <el-row style="margin-top: 40px">
            <span style="font-size: 15px;margin-left: 225px">缴纳押金</span>
            <el-input style="width: 300px ; padding-left:50px" placeholder="请输入金额"
                      v-model="deposit"></el-input>
            <span style="font-size: 15px;margin-left: 165px">备注</span>
            <el-input style="width: 300px ; padding-left:50px" placeholder="请输入备注"
                      v-model="memo"></el-input>
          </el-row>
        </div>
      </el-card>
    </el-row>
    <el-button type="primary" style="margin-top: 50px ;margin-left: 570px ; width: 80px" @click="load">提交</el-button>
    <el-button type="warning" style="margin-left: 50px ; width: 80px">清除</el-button>
  </div>
</template>

<script>
export default {
  name: "CheckOut",
  data() {
    return {
      value: '',
      time: '',
      name: "",
      phone: "",
      id: "",
      address: "",
      userMemo: "",
      room: "",
      deposit: "",
      memo: "",
      timeIn:"",
      timeOut:"",
      options: [{
        value: '选项1',
        label: '居民身份证'
      }]
    }
  },
  methods: {
    load() {
      if (this.phone==''){
        this.$message.error("请输入手机号码！")
        return
      }else if (this.id==''){
        this.$message.error("请输入身份证号！")
        return
      }else if (this.room==''){
        this.$message.error("请输入房间号！")
        return
      }else if (this.deposit==''){
        this.$message.error("请输入押金！")
        return
      }
      let form = new FormData();
      form.append("name", this.name);
      form.append("phone", this.phone);
      form.append("id", this.id);
      form.append("room", this.room);
      form.append("deposit", this.deposit);
      form.append("memo", this.memo);
      form.append("time", this.time);
      this.request.post("/Reception", form).then(res => {
        if (res.code=="401"){
          this.$message.error("请先登录！")
          this.$router.push("/login")
        }
        form.append("number",this.room)
        form.append("state","正在使用")
        this.request.post("/updateRoomState", form)
        this.$message.success("登记成功！")
        this.$router.push("/CheckOut")
        this.name = "",
            this.phone = "",
            this.id = "",
            this.room = "",
            this.deposit = "",
            this.memo = "",
            this.time = "",
            this.userMemo = "",
            this.address = "",
            this.value = ""
      })
    }
  }
}
</script>

<style scoped>

</style>
<style>
.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  height: 350px;
}
</style>
