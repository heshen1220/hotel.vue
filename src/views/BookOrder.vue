<template>
  <div>
    <div style="padding: 10px 0">
      <span style="font-size: 15px">身份证号</span>
      <el-input style="width: 200px" placeholder="请输入身份证号" class="ml-5" suffix-icon="el-icon-search"
                v-model="id"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
    </div>
    <el-table :data="tableData" border stripe header-cell-class-name="headerBg" style="padding-top: 30px">
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="id" label="身份证号">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="room" label="房间号">
      </el-table-column>
      <el-table-column prop="state" label="状态">
      </el-table-column>
      <el-table-column prop="timeIn" label="入住时间">
      </el-table-column>
      <el-table-column prop="timeOut" label="退房时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success">编辑<i class="el-icon-edit"></i></el-button>
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
      id: "",
      phone: "",
      room: "",
      state: "",
      timeIn: "",
      timeOut: "",
      BgColor: "#67C23A",
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      headerBg: 'headerBg',
      radio: "",
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/login").then(res => {
        if (res.code=="401"){
          this.$message.error("请先登录！")
          this.$router.push("/login")
        }
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
    handAdd() {
      this.dialogFormVisible = true
      this.form = {}
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