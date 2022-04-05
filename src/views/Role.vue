<template>
  <el-row>
    <el-col :span="12" >
      <el-card class="box-card" shadow="hover" header="管理员信息" style="margin-top: 20px;width: 90%;margin-left: 30px" align="center">
        <div class="text item" style="height: 650px">
          <el-table :data="tableData" style="padding-top: 2px">
            <el-table-column  width="55" >
            </el-table-column>
            <el-table-column prop="resources" label="资源名称">
            </el-table-column>
            <el-table-column prop="identification" label="标识">
            </el-table-column>
            <el-table-column prop="type" label="类型">
            </el-table-column>
          </el-table>
          <el-button style="margin-top: 50px" type="primary" @click="handAdd">新增管理员<i class="el-icon-circle-plus-outline"></i></el-button>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card" shadow="hover" header="前台用户信息" style="margin-top: 20px;width: 90% ;margin-left: 25px" align="center">
        <div class="text item" style="height: 650px">
          <el-table :data="Reception" style="padding-top: 2px">
            <el-table-column  width="55" >
            </el-table-column>
            <el-table-column prop="resources" label="资源名称">
            </el-table-column>
            <el-table-column prop="identification" label="标识">
            </el-table-column>
            <el-table-column prop="type" label="类型">
            </el-table-column>
          </el-table>
          <el-button style="margin-top: 250px" type="primary" @click="add">新增前台用户<i class="el-icon-circle-plus-outline"></i></el-button>
        </div>
      </el-card>
    </el-col>
    <el-dialog :title="use" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-col :span="11">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-col :span="11">
            <el-input v-model="form.id"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号">
          <el-col :span="11">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-col :span="11">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" slot="reference" class="ml-5" @click="increase(form)">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>

</template>

<script>
export default {
  name: "Role",
  data(){
    return{
      tableData: [],
      Reception:[],
      dialogFormVisible:false,
      form:{},
      use:""
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/Administrators").then(res => {
        if (res.code == "401") {
          this.$message.error("请先登录！")
          this.$router.push("/login")
        }
        this.tableData = res.result
      })
      this.request.get("/Reception").then(res => {
        this.Reception = res.result
      })
    },
    handAdd() {
      this.use="管理员"
      this.dialogFormVisible = true
    },
    add(){
      this.use="前台用户"
      this.dialogFormVisible = true
    },
    increase(form){
      if (form.phone.length!=11){
        this.$message.error("手机号码格式不符")
        return
      }
      if (form.id.length!=18){
        this.$message.error("身份证号格式不符")
        return
      }
      let data = new FormData();
      data.append("position", this.use);
      data.append("name", form.name);
      data.append("id", form.id);
      data.append("phone", form.phone);
      data.append("password", form.password);
      this.request.post("/addStaff", data).then(res => {
        if (res.code=="200"){
          this.$message.success("注册成功")
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>