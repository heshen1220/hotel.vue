<template>
  <div>
    <div style="padding: 10px 0">
      <span style="font-size: 15px">类型</span>
      <el-input style="width: 200px" placeholder="请输入类型" class="ml-5" suffix-icon="el-icon-search"
                v-model="number"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
    </div>
    <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange">
      </el-table-column>
      <el-table-column prop="type" label="类型名称">
      </el-table-column>
      <el-table-column prop="area" label="面积">
      </el-table-column>
      <el-table-column prop="people" label="可住人数">
      </el-table-column>
      <el-table-column prop="num" label="房间数量">
      </el-table-column>
      <el-table-column prop="price" label="单价">
      </el-table-column>
      <el-table-column prop="memo" label="备注">
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
  name: "RoomType.vue",
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      type: "",
      area: "",
      number: "",
      Single: "",
      people: "",
      price: "",
      memo: "",
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
      let form = new FormData();
      form.append("pageNum", this.pageNum);
      form.append("pageSize", this.pageSize);
      this.request.post("/roomType", form).then(res => {
        this.tableData = res.result.list
        console.log(this.tableData)
        this.total = res.result.total
        this.pageNum = res.result.pageNum
        this.pageSize = res.result.pageSize
      })
    },
    search() {
      this.number = ""
      this.state = ""
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