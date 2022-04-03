<template>
  <div>
    <div style="padding: 10px 0px 0px 0px">
      <span style="font-size: 15px">姓名</span>
      <el-input style="width: 200px" placeholder="请输入姓名" class="ml-5" suffix-icon="el-icon-search"
                v-model="name"></el-input>
      <span style="font-size: 15px ;padding-left: 30px">身份证号</span>
      <el-input style="width: 200px" placeholder="请输入身份证号" class="ml-5" suffix-icon="el-icon-search"
                v-model="id"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
    </div>
    <el-table :data="tableData" border stripe header-cell-class-name="headerBg" style="padding-top: 30px">
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="certificates" label="证件类型">
      </el-table-column>
      <el-table-column prop="id" label="身份证号" width="170px">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="room" label="房间号">
      </el-table-column>
      <el-table-column prop="timeIn" label="入住时间" width="170px">
      </el-table-column>
      <el-table-column prop="timeOut" label="退房时间" width="170px">
      </el-table-column>
      <el-table-column prop="deposit" label="押金">
      </el-table-column>
      <el-table-column prop="memo" label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handAdd(scope.row)" :type="colour" :disabled="disabled(scope.row)" style="width: 80px">{{checkOut}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2,5,10,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">

    </el-dialog>
    <el-dialog title="房间信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="房间号">
          <el-col :span="11">
            <el-input v-model="form.room"></el-input>
          </el-col>
        </el-form-item>
        <div>
          <span style="margin-left: 50px">入住时间:{{ form.timeIn }}</span><span
            style="margin-left: 30px">退房时间:{{ form.timeOut }}</span>
        </div>
        <el-form-item label="房间类型" style="padding-top: 18px">
          <el-select v-model="form.type" placeholder="请选择房间类型">
            <el-option label="标准间" value="标准间"></el-option>
            <el-option label="麻将房" value="麻将房"></el-option>
            <el-option label="大床房" value="大床房"></el-option>
            <el-option label="家庭房" value="家庭房"></el-option>
            <el-option label="豪华客房" value="豪华客房"></el-option>
            <el-option label="商务单人间" value="商务单人间"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价">
          <el-col :span="5">
            <el-input v-model="form.price"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="押金">
          <el-col :span="5">
            <el-input v-model="form.deposit"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="应退金额">
          <el-input type="textarea" v-model="form.return"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" slot="reference" class="ml-5" @click="open(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BookOrder.vue",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      name: "",
      phone: "",
      certificates: "",
      id: "",
      room: "",
      deposit: "",
      timeIn: "",
      timeOut: "",
      memo: "",
      type: "",
      uuid:'',
      people: "",
      state: "",
      BgColor: "#67C23A",
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      headerBg: 'headerBg',
      radio: "",
      checkOut:'',
      colour:'success'
    }
  },
  created() {
    this.load()
  },
  methods: {
    disabled(row){
      if (row.memo==""||row.memo==null){
/*        this.colour="success"*/
        this.checkOut="退房"
        return false
      }else {
/*        this.colour="warning"*/
        this.checkOut="已退房"
        return true
      }
    },
    load() {
      let form = new FormData();
      form.append("pageNum", this.pageNum);
      form.append("pageSize", this.pageSize);
      this.request.post("/getReception", form).then(res => {
        if (res.code == "401") {
          this.$message.error("请先登录！")
          this.$router.push("/login")

        }
        this.tableData = res.result.list
        console.log(this.tableData)
        this.total = res.result.total
        this.pageNum = res.result.pageNum
        this.pageSize = res.result.pageSize
      })
    },
    search() {
      this.load()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    handAdd(row) {
      let form = new FormData();
      form.append("number", this.room);
      this.request.post("/room", form).then(res => {
            if (res.code == "401") {
              this.$message.error("请先登录！")
              this.$router.push("/login")
            }
            this.dialogFormVisible = true
            row.type = res.result.list[0].type
            row.state = res.result.list[0].state
            row.price = res.result.list[0].price
            row.return = (this.date(row.timeIn, row.timeOut) * row.price)
            row.return = row.deposit - row.return
            this.form = row
          },
      )
    },
    open(form) {
      let data = new FormData();
      data.append("memo", "已退金额:" + form.return)
      data.append("uuid", form.uuid)
      data.append("number",form.room)
      data.append("state","未打扫")
      let entry=form.deposit-form.return
      data.append("name",entry.toString())
      this.request.post("/stateChange", data).then(res => {
        if (res.code == "200") {
          this.$message.success("退房成功！")
          this.dialogFormVisible = false
          this.request.post("/updateRoomState", data)
          this.load()
        } else {
          this.dialogFormVisible = false
          this.$message.error("操作失败！")
          this.load()
        }
      })
    },
    date(timeIn, timeOut) {
      const start = new Date(timeIn) //clone
      const end = new Date(timeOut) //clone
      let dayCount = 0

      while (end > start) {
        dayCount++
        start.setDate(start.getDate() + 1)
      }

      return dayCount
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    change() {
      this.BgColor = "#000000"
      console.log(this.BgColor)
    },
  }
}
</script>
<style>
.headerBg {
  background: #eee !important;
}
</style>

<style scoped>

</style>