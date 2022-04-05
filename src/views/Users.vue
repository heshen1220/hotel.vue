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
      <el-table-column prop="id" label="身份证号">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="position" label="职位">
      </el-table-column>
      <el-table-column prop="creatTime" label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handAdd(scope.row)">改密<i class="el-icon-edit"></i></el-button>
          <el-button type="warning" @click="deleteRoom(scope.row)" v-if="user.position=='管理员'">删除<i class="el-icon-remove-outline"></i></el-button>
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
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="请输入旧密码">
          <el-col :span="13">
            <el-input v-model="form.password" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="请输入新密码" >
          <el-col :span="13">
            <el-input v-model="form.ne" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="请重复输入新密码">
          <el-col :span="13">
            <el-input v-model="form.age" show-password></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" slot="reference" class="ml-5" @click="increase(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import user from "@/views/User";

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
      position: "",
      password: "",
      creatTime: "",
      BgColor: "#67C23A",
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      headerBg: 'headerBg',
      radio: "",
      user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      let form = new FormData();
      form.append("pageNum", this.pageNum);
      form.append("pageSize", this.pageSize);
      form.append("name",this.name)
      form.append("id",this.id)
      this.request.post("/getStaff", form).then(res => {
        this.tableData = res.result.list
        console.log(this.tableData)
        this.total = res.result.total
        this.pageNum = res.result.pageNum
        this.pageSize = res.result.pageSize
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handAdd(row){
      this.form=row
      this.form.password=""
      this.dialogFormVisible=true
},
    increase(form){
      if (form.ne!=form.age){
        this.$message.error("密码输入不一致！")
        return
      }
      let data = new FormData();
      data.append("id",form.id)
      data.append("password", form.password);
      data.append("newPassword", form.ne);
      data.append("again",form.age)
      this.request.post("/updatePassword", data).then(res => {
       if (res.code!=200){
         this.$message.error(res.message)
         this.dialogFormVisible=false
       }
        this.$message.success("修改成功")
        this.dialogFormVisible=false
        this.load()
      })
    },
    deleteRoom(row){
      this.$confirm('将删除该用户，是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = new FormData();
        data.append("id", row.id);
        this.request.post("/deleteStaff", data).then(res => {
          if (res.code == "200") {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else {this.$message({
            type: 'error',
            message: '删除失败!'
          });}
          this.load()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
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