<template>
  <div>
    <div style="padding: 10px 0">
      <span style="font-size: 15px">房间号</span>
      <el-input style="width: 200px" placeholder="请输入房号" class="ml-5" suffix-icon="el-icon-search"
                v-model="number"></el-input>
      <template>
        <el-radio v-model="radio" label="空房" style="padding-left: 50px">可用</el-radio>
        <el-radio v-model="radio" label="正在使用">不可用</el-radio>
      </template>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button class="ml-5" type="warning" @click="search">清空</el-button>
    </div>
    <div style="margin: 3px 0">
      <el-button type="primary" @click="insert">新增<i class="el-icon-circle-plus-outline"></i></el-button>
    </div>
    <el-table :data="tableData" border stripe header-cell-class-name="headerBg" style="padding-top: 2px">
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange">
      </el-table-column>
      <el-table-column prop="number" label="房间号">
      </el-table-column>
      <el-table-column prop="area" label="房间面积">
      </el-table-column>
      <el-table-column prop="type" label="房间类型">
      </el-table-column>
      <el-table-column prop="people" label="可住人数">
      </el-table-column>
      <el-table-column prop="state" label="房间状态">
      </el-table-column>
      <el-table-column prop="price" label="房间价格">
      </el-table-column>
      <el-table-column prop="memo" label="房间备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="handAdd(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
          <el-button type="warning" @click="deleteRoom(scope.row)">删除<i class="el-icon-remove-outline"></i></el-button>
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
    <el-dialog title="房间信息" :visible.sync="dialogFormVisible">
    </el-dialog>
    <el-dialog title="房间信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="房间号">
          <el-col :span="11">
            <el-input v-model="form.number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="房间面积">
          <el-col :span="11">
            <el-input v-model="form.area"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="房间类型">
          <el-select v-model="form.type" placeholder="请选择房间类型" @change="change">
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
        <el-form-item label="房间状态">
          <el-select v-model="form.state" placeholder="请选择房间状态">
            <el-option label="空房" value="空房"></el-option>
            <el-option label="正在使用" value="正在使用"></el-option>
            <el-option label="未打扫" value="未打扫"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可住人数">
          <el-col :span="5">
            <el-input v-model="form.people"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="房间备注">
          <el-input type="textarea" v-model="form.memo"></el-input>
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
  name: "Room.vue",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      uuid: "",
      number: "",
      area: "",
      type: "",
      people: "",
      state: "",
      price: "",
      memo: "",
      code:"200",
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      headerBg: 'headerBg',
      currentPathName:"房间信息",
      radio: "",
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
      form.append("number", this.number);
      form.append("state", this.radio);
      this.request.post("/room", form).then(res => {
        this.tableData = res.result.list
        console.log(this.tableData)
        this.total = res.result.total
        this.pageNum = res.result.pageNum
        this.pageSize = res.result.pageSize
        this.uuid=""
      })
    },
    search() {
      this.radio = ""
      this.number = ""
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
    insert(){
      this.dialogFormVisible = true
      this.form = {}
    },
    handAdd(tab) {
      this.dialogFormVisible = true
      this.form = tab
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    change(change) {
      if (change == "标准间" || change == "大床房") {
        this.form.people = 2;
        this.form.price = 120;
      } else if (change == "家庭房") {
        this.form.people = 3;
        this.form.price = 160;
      } else if (change == "麻将房") {
        this.form.people = 4;
        this.form.price = 180;
      } else if (change == "商务单人间") {
        this.form.people = 1;
        this.form.price = 150;
      } else if (change == "豪华客房") {
        this.form.people = 2;
        this.form.price = 300;
      }
      this.form.state="空房"
    },
    submit(form) {
      let data = new FormData();
      data.append("number", form.number);
      data.append("area", form.area);
      data.append("type", form.type);
      data.append("people", form.people);
      data.append("state", form.state);
      data.append("price", form.price);
      data.append("memo", form.memo);
      if (!form.uuid){
      this.request.post("/setRoom", data).then(res => {
        this.code=res.code
        this.dialogFormVisible = false
        this.load()
      })}else{
        data.append("uuid",form.uuid)
        this.request.post("/updateRoom", data).then(res => {
          this.code=res.code
          this.dialogFormVisible = false
          this.load()
      })}
    },
    open(form) {
      if (!form.uuid) {
        this.$confirm('将创建新客房，是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submit(form)
          alert(this.code)
          if (this.code=="200") {
            this.$message({
              type: 'success',
              message: '创建成功!'
            });
          }else {
            this.$message({
            type: 'error',
            message: '创建失败!'
          });}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消新增'
          });
        });
      }else{
        this.$confirm('将修改客房信息，是否确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submit(form)
          if (this.code=="200"){
          this.$message({
            type: 'success',
            message: '修改成功!'
          });}else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      }
    },
    deleteRoom(row){
      this.$confirm('将删除客房信息，是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = new FormData();
        data.append("uuid", row.uuid);
        this.request.post("/deleteRoom", data).then(res => {
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