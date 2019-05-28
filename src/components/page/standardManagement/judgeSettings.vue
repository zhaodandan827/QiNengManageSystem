<template>
    <div class="judgeSetting">
        <el-row :gutter="20" class="operTem">
            <el-col :span="20" class="text-align-right addBtn">
                <el-button type="success" @click="addBtnDialog"  icon="el-icon-plus" size="small">添加</el-button>
            </el-col>
            <el-col :span="4">
                <el-input
                        class="temSearch"
                        placeholder="请输入标准名称"
                        v-model="temSearchInput"
                        prefix-icon="el-icon-search"
                        clearable>
                </el-input>
            </el-col>
        </el-row>
        <el-row class="tempTableHeight">
            <el-table
                    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    border
                    stripe
                    :row-style="rowStyle"
                    :cell-style="rowStyle"
                    height="calc(100% - 0px)"
                    :header-cell-style="headercellstyle"
                    style="width: 100%">
                <el-table-column
                        prop="index"
                        label="序号"
                        align="center"
                        type="index"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标准名称"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="更新日期"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="addUser"
                        label="添加人"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        width="200"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"></el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.$index, scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="text-align-right marginTop10">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20,30,40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
            </el-pagination>
        </el-row>
        <!--添加弹窗-->
        <el-row class="dialogCont">
            <el-dialog
                    title="添加标准"
                    :visible.sync="dialogVisible"
                    width="75%"
                    v-if='dialogVisible'
                    :modal-append-to-body='false'>
                <!--弹窗内容-->
                <el-form :model="dialogAddData" :rules="dialogAddData.rules" ref="ruleForm">
                <el-row :gutter="10">
                   <el-col :span="4" class="text-align-right">
                        <span class="lineHeight30">标准名称：</span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="standardName">
                            <el-input  v-model="dialogAddData.standardName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col  :span="4" class="text-align-right">
                        <span class="lineHeight30">数据更新时间：</span>
                    </el-col>
                    <el-col :span="6">
                            <el-date-picker
                                    v-model="updateTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                    </el-col>
                </el-row>
                <el-row :gutter="10" class="marginTop10">
                    <el-col :span="4" class="text-align-right">
                        <span class="lineHeight30">备注：</span>
                    </el-col>
                    <el-col :span="16">
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入备注内容"
                                v-model="standardRemarks">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="10" class="marginTop10">
                    <el-col :span="4" class="text-align-right">
                        <span class="lineHeight30">温度范围：</span>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="tempRangeValue" placeholder="请选择">
                            <el-option
                                    v-for="item in tempRange"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col  :span="4" class="text-align-right">
                        <span class="lineHeight30">列表操作：</span>
                    </el-col>
                    <el-col :span="6">
                        <el-button @click="addNode()" size="mini" type="success">添加</el-button>
                        <el-button @click="deleteNode()" size="mini" type="success">删除</el-button>
                    </el-col>
                </el-row>
                <el-row class="marginTop10">
                    <el-table :data="list" border>
                        <el-table-column
                                prop="name"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                width="220"
                                v-for="(item,i) in columnDate" :key="i"
                                align='center'>
                            <template  slot="header" slot-scope="scope">
                                <el-row>
                                    <el-col :span="9">
                                        <el-select class="marginLeft5" v-model="startMonth[i]" placeholder="">
                                            <el-option
                                                    v-for="item in selectMonth"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="3">
                                        <p class="lineHeight30">—</p>
                                    </el-col>
                                    <el-col :span="9">
                                        <el-select v-model="endMonth[i]" placeholder="">
                                            <el-option
                                                    v-for="item in selectMonth"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="2">
                                        <p class="lineHeight30">月</p>
                                    </el-col>
                                </el-row>
                            </template>
                              <template slot-scope="scope">
                                 <el-input  v-model="scope.row.columnList[i]" ></el-input>
                              </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button  @click="dialogCancle">取 消</el-button>
                <el-button type="primary" @click="dialogSure">确 定</el-button>
                </span>
            </el-dialog>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "judgeSettings",
        data(){
            return{
                id:'',
                flag:true,
                dialogAddData: {
                    //标准名字
                    standardName:'',
                    rules: {
                        standardName: [
                            {required: true, message: '标准名字不能为空', trigger: 'blur'},
                        ],
                    }
                },
                temSearchInput:'',
                inputCount:3,
                dialogVisible:false,
                tableData: [],
                totalDate:0,
                pageSize: 10,
                currentPage: 1,
                updateId:'',
                columnDate:[{}],
                count:1,
                columnIndex:0,
                //弹窗时间选择
                startMonth:[''],
                endMonth:[''],

                //数据更新时间
                updateTime:'',
                //备注
                standardRemarks:'',
            //   参照标准
                referenceStandard:'',
            //    厂商提醒
                manufacturerReminder:'',
            //    温度范围
                tempRangeValue:'',
                tempRange: [],
                list:[],
                selectMonth:[]
            }
        },
        mounted(){
            let _this=this;
            _this.getTableDate();
        },
        methods:{
            //************表格操作*************************
            getTableDate(){
                let _this=this;
                let url=_this.GLOBAL.baseURL+'/standard/getStandards';
                $.ajax({
                    url: url,
                    type: 'get',
                    async: false,
                    success: function (data) {
                        if(data.state===1){
                            if(data.res){
                                _this.tableData=data.res;
                                _this.totalDate=data.res.length;
                            }
                        }else {
                            _this.$message({
                                message: data.msg,
                                type: 'warning'
                            });
                        }
                    },
                    error: function (err) {
                    },
                    complete: function (XMLHttpRequest, status) {
                    }
                });
            },
            //分页操作
            handleSizeChange(size) {
                this.pageSize = size;
            },
            rowStyle(row){
                return 'padding:5px' ;
            },
            //主页表格第一行样式
            headercellstyle({row,col,rowIndex,colIndex}){
                if(rowIndex == 0){
                    return 'background:#F1F2F4;font-size:12px;color:#000';
                }
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            //编辑操作
            handleEdit(index, row) {
                let _this=this;
                _this.dialogVisible=true;
                _this.dialogAddData.standardName=row.title;
                _this.id=row.id;
                _this.getTempList(row.temperId);
                _this.monthSelect();

            },
            //删除操作
            handleDelete(index, row) {
                // let _this=this,
                //     data={id:row.id};
                // let url=_this.GLOBAL.baseURL+'/temper/delete';
                // $.ajax({
                //     data:data,
                //     url: url,
                //     type: 'get',
                //     async: false,
                //     success: function (data) {
                //         if(data.state===1){
                //             _this.$message({
                //                 message: '删除成功！',
                //                 type: 'success'
                //             });
                //             _this.getTemTableDate();
                //         }else {
                //             _this.$message({
                //                 message: data.msg,
                //                 type: 'warning'
                //             });
                //         }
                //     },
                //     error: function (err) {
                //     },
                //     complete: function (XMLHttpRequest, status) {
                //     }
                // });


            },
            //**************弹窗操作******************************
            //月份选择
            monthSelect(){
                let _this=this;
                for(let i=1;i<25;i++){
                    _this.selectMonth.push(
                        {
                            value:i,
                            label:i
                        }
                    )
                }
            },
            //添加标本div
            addNode:function() {
                this.columnDate.push({});
            },
            //删除样本div
            deleteNode:function(i) {
                this.columnDate.pop();
                this.startMonth.pop();
                this.endMonth.pop();
            },
            //添加打开弹窗
            addBtnDialog(){
                let _this=this;
                _this.dialogVisible=true;
                _this.getTempList();
                _this.monthSelect();
            },
            //获取温度列表
            getTempList(temperId){
                let _this=this;
                let url=_this.GLOBAL.baseURL+'/temper/getTempers';
                $.ajax({
                    url: url,
                    type: 'get',
                    async: false,
                    success: function (data) {
                        if(data.state===1){
                            if(data.res){
                                let ranges=[],listArr=[];
                                for(let i=0;i<data.res.length;i++){
                                    _this.tempRange.push(
                                        {
                                            value:data.res[i].id,
                                            label:data.res[i].title,
                                        }
                                    );
                                    if(data.res[i].ranges){
                                        ranges=data.res[i].ranges.split(',');
                                        for(let k=0;k<ranges.length;k++){
                                            listArr.push(
                                                {
                                                    name:ranges[k]+"—"+ranges[k+1]+'℃',
                                                    columnList:['',],
                                                    month:[''],

                                                }
                                            );
                                            k++;
                                        }
                                        _this.list=listArr;
                                    }
                                }
                                if(temperId){
                                    _this.tempRangeValue=temperId;
                                }else {
                                    _this.tempRangeValue=data.res[0].id;
                                }
                            }
                        }else {
                            _this.$message({
                                message: data.msg,
                                type: 'warning'
                            });
                        }
                    },
                    error: function (err) {
                    },
                    complete: function (XMLHttpRequest, status) {
                    }
                });
            },
            //获取温度范围
            getTempRang(temperId){
                let _this=this;
                let url=_this.GLOBAL.baseURL+'/temper/getTempers';
                $.ajax({
                    url: url,
                    type: 'get',
                    async: false,
                    id:temperId,
                    success: function (data) {


                    },
                    error: function (err) {
                    },
                    complete: function (XMLHttpRequest, status) {
                    }
                });
            },
            //获取温度范围列表
            //弹窗内容数据
            dialogSure(){
                let _this=this,standardList=[],totalData = [];
                _this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        return   _this.flag=true;
                    } else {
                        toastr.error("内容选项不能为空!");
                        return   _this.flag=false;
                    }
                });
                if(!_this.flag){
                    return ;
                }
                for(let i=0;i<_this.list.length;i++){
                    totalData.push(_this.list[i].columnList)
                }
                for(let k=0;k<totalData.length;k++){
                    for(let i=0;i<totalData[k].length;i++){
                        standardList.push({
                            startMonth:_this.startMonth[i],
                            endMonth:_this.endMonth[i],
                            num:totalData[k][i]
                        }
                    );
                  }
                }
                let data= {
                    standard: {
                        title: _this.dialogAddData.standardName,
                        remark: _this.standardRemarks,
                        refer: _this.referenceStandard,
                        tip: _this.manufacturerReminder,
                        temperId: _this.tempRangeValue,
                    },
                    standardList: standardList
                };
                let url=_this.GLOBAL.baseURL+'/standard/add';
                $.ajax({
                    contentType: 'application/json',
                    data:JSON.stringify(data) ,
                    url: url,
                    type: 'post',
                    async: false,
                    success: function (data) {
                        if(data.state===1){
                            _this.$message({
                                message: '添加成功！',
                                type: 'success'
                            });
                            _this.dialogVisible = false;
                            _this.getTableDate();
                            _this.list=[];
                        }else {
                            _this.$message({
                                message: data.msg,
                                type: 'warning'
                            });
                        }
                    },
                    error: function (err) {
                    },
                    complete: function (XMLHttpRequest, status) {
                    }
                });
            },
            //关闭弹窗
            dialogCancle(){
                let _this=this;
                _this.list=[];
                _this.dialogVisible = false;
            }
        }
    }
</script>
<style>
    .judgeSetting{
        height: calc(100% - 0px);
    }
    .judgeSetting .el-date-editor--monthrange.el-input__inner{
        width: 200px !important;
    }
    .judgeSetting .temTitle{
        font-size: 14px;
        font-weight: 600;
    }
    .judgeSetting .tempTableHeight{
        height:calc(82% - 0px);
    }
    .judgeSetting .operTem{
        padding: 10px;
    }
    .judgeSetting .addBtn{
        padding-top: 1px;
    }
    .judgeSetting .temSearch .el-input__inner{
        height: 35px ;
        line-height: 35px ;
    }
    .judgeSetting  .temSearch .el-input__icon {
        line-height: 35px;
    }
    /*弹窗*/
    .judgeSetting .dialogCont .inputList .el-input__inner{
        height: 25px;
        line-height: 25px;
    }
    .judgeSetting .dialogCont .temName{
        line-height: 30px;
    }
    .judgeSetting .dialogCont .inputList .el-input{
        width: 85%;
    }
    .judgeSetting .dialogCont .addCont{
        border: 1px solid #66b1ff;
        padding: 8px;
        width: 32.5%;
        margin:10px 3px 0 3px
    }
    .judgeSetting .dialogCont input::-webkit-outer-spin-button,
    .judgeSetting .dialogCont input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .judgeSetting .dialogCont input[type="number"] {
        -moz-appearance: textfield;
    }
    .judgeSetting .dialogCont .addCont .el-button--mini.is-round{
        padding: 5px 8px;
    }
    .judgeSetting .dialogCont .addCont .el-textarea__inner{
        width: 87% !important;
    }
    .judgeSetting .dialogCont  .el-table thead th div {
        padding-left: 0px !important;
        padding-right: 0px !important;
        line-height:8px !important;
    }
</style>
