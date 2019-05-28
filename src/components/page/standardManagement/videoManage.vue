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
                <el-row :gutter="20">
                    <el-col :span="3">
                        <p class="temName">温度范围名称：</p>
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="inputName" placeholder="请输入名称"></el-input>
                    </el-col>
                    <el-col :span="4" >
                        <el-button @click="addNode()" size="mini" type="success">添加</el-button>
                        <el-button @click="deleteNode()" size="mini" type="success">删除</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <!--     <el-table :data="list" border>
                             <el-table-column
                                     width="150"
                                     v-for="(item,index) in list" :key="index"
                                     align='center'>
                                 <template slot-scope="scope">
                                     <span>{{item[index].name}}</span>
                                 <el-input v-model="item.value"  ></el-input>
                                 </template>
                             </el-table-column>
                         </el-table>-->
                    <div v-for="(item,index) in list" :key="index">
                        <div v-for="(a,i) in item" :key="i">
                            <span v-if="i==0">{{a.name}}</span>
                            <el-input v-else v-model="a.value"></el-input>
                        </div>
                    </div>
                </el-row>
                <el-row class="inputList">
                    <!--                    <div style="float: left">-->
                    <!--                        &lt;!&ndash;温度&ndash;&gt;-->
                    <!--                       <p v-for="(item,i) in tempList">{{item.tempName}}</p>-->
                    <!--                    </div>-->
                    <!--                     <div v-for="(v,index) in list"   style="float: left">-->
                    <!--                         <el-input v-for="(item,i) in tempList" v-model="list[index].contactType" type="number" placeholder=""></el-input>-->
                    <!--                     </div>-->
                    <!--                    <el-col :span="7" class="addCont"  v-for="(v,i) in list">-->
                    <!--                        <el-col :span="9">-->
                    <!--                            <el-input v-model="list[i].contactType" type="number" placeholder=""></el-input>-->
                    <!--                        </el-col >-->
                    <!--                        <el-col :span="1">-->
                    <!--                            <span>—</span>-->
                    <!--                        </el-col>-->
                    <!--                        <el-col :span="9">-->
                    <!--                            <el-input v-model="list[i].number" type="number" placeholder=""></el-input>-->
                    <!--                        </el-col>-->
                    <!--                        <el-col :span="5">-->
                    <!--                            <el-button type="danger"  @click="deleteNode(i)" size="mini" round>删除</el-button>-->
                    <!--                        </el-col>-->
                    <!--                    </el-col>-->
                </el-row>
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
                inputName:'',
                temSearchInput:'',
                dialogVisible:false,
                tableData: [
                    {
                        title:"标准1",
                        updateTime:'2019-05-17',
                        addUser:'张三',
                    }

                ],
                totalDate:0,
                pageSize: 10,
                currentPage: 1,
                updateId:'',
                list:[
                    [{
                        name:'温度',
                        value:'',
                    },{
                        name:'输入框',
                        value:'',
                    },{
                        name:'输入框',
                        value:'',
                    },{
                        name:'输入框',
                        value:'',
                    }],

                ]
                // tabeleData:[
                //     {
                //        key:'',
                //        name:'',
                //        val:'',
                //        childern:[
                //
                //        ]
                //     },
                //     {}
                // ]
            }
        },
        created(){

        },
        mounted(){
            let _this=this;
            //_this.getTemTableDate();
        },
        methods:{
            renderHeader(h, {column, $index }) {
                column.test = 'test';
                console.log(column) ;// 这里打印下就知道新增属性成功
                return  $index ;
            },
            //************表格操作*************************
            // 获取表格数据
            getTemTableDate(){
                // let _this=this;
                // let url=_this.GLOBAL.baseURL+'/temper/getTempers';
                // $.ajax({
                //     url: url,
                //     type: 'get',
                //     async: false,
                //     success: function (data) {
                //         if(data.state===1){
                //             if(data.res){
                //                 _this.tableData=data.res;
                //                 _this.totalDate=data.res.length;
                //             }
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
            //分页操作
            handleSizeChange(size) {
                this.pageSize = size;
            },
            rowStyle(row){
                return 'padding:5px' ;
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            //表格第一行样式
            headercellstyle({row,col,rowIndex,colIndex}){
                if(rowIndex == 0){
                    return 'background:#F1F2F4;font-size:12px;color:#000';
                }
            },
            //编辑操作
            handleEdit(index, row) {
                let _this=this,rangeArr=[],rangeObj=[];
                // _this.dialogVisible=true;
                // _this.inputName=row.title;
                // _this.updateId=row.id;
                // if(row.ranges){
                //     //数据格式转换
                //     rangeArr=row.ranges.split(",");
                //     for(let i=0;i<rangeArr.length;i++){
                //         rangeObj.push(
                //             {
                //                 contactType:rangeArr[i],
                //                 number:rangeArr[i+1],
                //             });
                //         i++;
                //     }
                // }
                // _this.list=rangeObj;
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
            //*增加删除div操作*
            //添加标本div
            addNode:function() {
                let item={};
                for(let i=0;i<this.list.length;i++){
                    item={
                        name:'输入框',
                        value:'',
                    };
                    this.list[i].push(item)
                }
            },
            //删除样本div
            deleteNode:function(i) {
                this.testList.pop();
            },
            //添加打开弹窗
            addBtnDialog(){
                let _this=this;
                _this.dialogVisible=true;
            },
            //弹窗内容数据
            dialogSure(){
                let _this=this,tempArr=[];
                console.log(_this.testList);
                _this.dialogVisible=false;
            },
            //关闭弹窗
            dialogCancle(){
                let _this=this;
                _this.inputName='';
                _this.list=[
                    {contactType: '', number: ''}
                ];
                _this.dialogVisible = false;
            }
        }
    }
</script>
<style>
    .judgeSetting{
        height: calc(100% - 0px);
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

</style>
