<template>
    <div>
        <div style="padding: 10px 0">
            <span style="font-size: 15px">姓名</span>
            <el-input style="width: 200px" placeholder="请输入姓名" class="ml-5" suffix-icon="el-icon-search"
                      v-model="name"></el-input>
            <span style="font-size: 15px " class="ml-5">身份证号</span>
            <el-input style="width: 200px" placeholder="请输入身份证号" suffix-icon="el-icon-search" v-model="id"
                      class="ml-5"></el-input>
            <span style="font-size: 15px" class="ml-5">手机号</span>
            <el-input style="width: 200px" placeholder="请输入手机号" suffix-icon="el-icon-search" v-model="tel"
                      class="ml-5"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="search">搜索</el-button>
        </div>
        <div style="margin: 10px 0">
            <el-button type="primary" @click="handAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
        </div>
        <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
            <el-table-column type="selection" width="55" @selection-change="handleSelectionChange">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="140">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="120">
            </el-table-column>
            <el-table-column prop="id" label="身份证号">
            </el-table-column>
            <el-table-column prop="tel" label="手机号码">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column prop="preference" label="偏好">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
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
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
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
        name: "User.vue",
        data(){
            return{
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 10,
                name: "",
                sex: "",
                id: "",
                tel: "",
                address: "",
                dialogFormVisible: false,
                form:{},
                multipleSelection:[],
                headerBg:'headerBg',
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
                form.append("name", this.name);
                form.append("id", this.id);
                form.append("tel", this.tel);
                this.request.post("/customer", form).then(res => {
                    this.tableData = res.result.list
                    console.log(this.tableData)
                    this.total = res.result.total
                    this.pageNum = res.result.pageNum
                    this.pageSize = res.result.pageSize
                })
            },
            search() {
                this.name = ""
                this.id = ""
                this.tel = ""
                this.load()
            },
            handleSizeChange(pageSize) {
                console.log(pageSize)
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