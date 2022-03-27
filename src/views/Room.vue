<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>房间信息</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="padding: 10px 0">
            <span style="font-size: 15px">房间号</span>
            <el-input style="width: 200px" placeholder="请输入房号" class="ml-5" suffix-icon="el-icon-search"
                      v-model="number"></el-input>
            <template>
                <el-radio v-model="radio" label="空房" style="padding-left: 50px">可用</el-radio>
                <el-radio v-model="radio" label="正在使用" >不可用</el-radio>
            </template>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="search">清空</el-button>
        </div>
      <div style="margin: 10px 0">
        <el-button type="primary" @click="handAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </div>
        <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
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
            <template slot-scope="scope" >
              <el-button type="successds">编辑<i class="el-icon-edit"></i></el-button>
              <el-button type="warning">删除<i class="el-icon-remove-outline"></i></el-button>
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
              <el-input></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="房间面积">
            <el-col :span="11">
              <el-input></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="房间类型">
            <el-select v-model="form.region" placeholder="请选择房间类型">
              <el-option label="标准间" value="标准间"></el-option>
              <el-option label="麻将房" value="麻将房"></el-option>
              <el-option label="大床房" value="大床房"></el-option>
              <el-option label="家庭房" value="家庭房"></el-option>
              <el-option label="豪华客房" value="豪华客房"></el-option>
              <el-option label="商务单人间" value="商务单人间"></el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>-->
          <el-form-item label="单价">
            <el-col :span="5">
              <el-input></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="可住人数">
            <el-col :span="5">
              <el-input></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="房间备注">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <!--<el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-popconfirm
              confirm-button-text='是的'
              cancel-button-text='返回'
              icon="el-icon-info"
              icon-color="red"
              title="确认修改？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="primary" slot="reference" class="ml-5" @click="dialogFormVisible = false">确 定</el-button>
          </el-popconfirm>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Room.vue",
        data(){
            return{
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 10,
                floor: "",
                number: "",
                area:"",
                type: "",
                people:"",
                state: "",
                price: "",
                memo:"",
                dialogFormVisible: false,
                form:{},
                multipleSelection:[],
                headerBg:'headerBg',
                radio:"",
            }
        },
        created() {
            this.load()
        },
        methods:{
            load() {
                let form = new FormData();
                form.append("pageNum", this.pageNum);
                form.append("pageSize", this.pageSize);
                form.append("number", this.number);
                form.append("state", this.radio);
                this.request.post("http://localhost:8090/room", form).then(res => {
                    this.tableData = res.result.list
                    console.log(this.tableData)
                    this.total = res.result.total
                    this.pageNum = res.result.pageNum
                    this.pageSize = res.result.pageSize
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
            handAdd(){
                this.dialogFormVisible=true
                this.form={}
            },
            handleSelectionChange(val){
                this.multipleSelection=val
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