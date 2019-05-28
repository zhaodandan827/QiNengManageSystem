<template>
    <div class="temperatureRange">
      <el-row :gutter="20" class="operTem">
        <el-col :span="20" class="text-align-right addBtn">
          <el-button type="success" @click="addBtnDialog"  icon="el-icon-plus" size="small">添加</el-button>
        </el-col>
        <el-col :span="4">
          <el-input
            class="temSearch"
            placeholder="请输入温度范围名称"
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
            label="温度范围名称"
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
                :total="totalDate">
        </el-pagination>
      </el-row>
      <!--添加弹窗-->
      <el-row class="dialogCont">
        <el-dialog
          title="添加产品"
          :visible.sync="dialogVisible"
          width="75%"
          v-if='dialogVisible'
          :modal-append-to-body='false'
          >
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
            </el-col>
          </el-row>
          <el-row class="inputList  text-align-center">
            <el-col :span="7" class="addCont"  v-for="(v,i) in list">
                <el-col :span="9">
                  <el-input v-model="list[i].contactType" type="number" placeholder=""></el-input>
                </el-col >
                <el-col :span="1">
                  <span>—</span>
                </el-col>
                <el-col :span="9">
                  <el-input v-model="list[i].number" type="number" placeholder=""></el-input>
                </el-col>
                <el-col :span="5">
                  <el-button type="danger"  @click="deleteNode(i)" size="mini" round>删除</el-button>
<!--                  <div data-repeater-delete="" v-on:click="deleteNode(i)">-->
<!--                    <span> 删除 </span>-->
<!--                  </div>-->
                </el-col>

            </el-col>
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
        name: "temperatureRange",
      data(){
          return{
            inputName:'',
            //联系人类型数组
            list:[
              {contactType: '', number: ''}
            ],
            temSearchInput:'',
            dialogVisible:false,
            tableData: [],
            totalDate:0,
            pageSize: 10,
            currentPage: 1,
            updateId:'',
          }
      },
      created(){

      },
      mounted(){
          let _this=this;
          _this.getTemTableDate();
      },
      methods:{
        // 获取表格数据
        getTemTableDate(){
          let _this=this;
          let url=_this.GLOBAL.baseURL+'/temper/getTempers';
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
        //添加标本div
        addNode:function() {
          this.list.push({contactType: '', number: ''});
        },
        //删除样本div
        deleteNode:function(i) {
          this.list.splice(i,1);  //删除index为i,位置的数组元素
        },
        handleSizeChange(size) {
          this.pageSize = size;
        },
        rowStyle(row){
          return 'padding:5px' ;
        },
        handleCurrentChange(currentPage) {
          this.currentPage = currentPage;
        },
        headercellstyle({row,col,rowIndex,colIndex}){
          if(rowIndex == 0){
            return 'background:#F1F2F4;font-size:12px;color:#000';
          }
        },
        handleEdit(index, row) {
          let _this=this,rangeArr=[],rangeObj=[];
          _this.dialogVisible=true;
          _this.inputName=row.title;
          _this.updateId=row.id;
          if(row.ranges){
            //数据格式转换
            rangeArr=row.ranges.split(",");
            for(let i=0;i<rangeArr.length;i++){
              rangeObj.push(
                      {
                        contactType:rangeArr[i],
                        number:rangeArr[i+1],
                      });
               i++;
            }
          }
          _this.list=rangeObj;
        },
        handleDelete(index, row) {
          let _this=this,
              data={id:row.id};
          let url=_this.GLOBAL.baseURL+'/temper/delete';
          $.ajax({
            data:data,
            url: url,
            type: 'get',
            async: false,
            success: function (data) {
              if(data.state===1){
                _this.$message({
                  message: '删除成功！',
                  type: 'success'
                });
                _this.getTemTableDate();
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
        //添加打开弹窗
        addBtnDialog(){
          let _this=this;
          _this.dialogVisible=true;
        },
        //弹窗内容数据
        dialogSure(){
          let _this=this,tempArr=[];
          for(let i=0;i<_this.list.length;i++){
            tempArr.push(_this.list[i].contactType);
            tempArr.push(_this.list[i].number);
          }
          if(_this.updateId){
            let data={
              title:_this.inputName,
              nums:tempArr,
              id:_this.updateId,
            };
            let url=_this.GLOBAL.baseURL+'/temper/update';
            $.ajax({
              data:data,
              url: url,
              type: 'get',
              async: false,
              success: function (data) {
                if(data.state===1){
                  _this.$message({
                    message: '编辑成功！',
                    type: 'success'
                  });
                  _this.dialogVisible = false;
                  _this.getTemTableDate();
                  _this.inputName='';
                  _this.updateId='';
                  _this.list=[
                    {contactType: '', number: ''}
                  ];
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
          }else {
            let data={title:_this.inputName,nums:tempArr};
            let url=_this.GLOBAL.baseURL+'/temper/add';
            $.ajax({
              data:data,
              url: url,
              type: 'get',
              async: false,
              success: function (data) {
                if(data.state===1){
                  _this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  _this.getTemTableDate();
                  _this.inputName='';
                  _this.list=[
                    {contactType: '', number: ''}
                  ];
                  _this.dialogVisible = false;
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
          }
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
.temperatureRange{
  height: calc(100% - 0px);
}
.temperatureRange .temTitle{
  font-size: 14px;
  font-weight: 600;
}
.temperatureRange .tempTableHeight{
  height:calc(82% - 0px);
}
.temperatureRange .operTem{
    padding: 10px;
  }
.temperatureRange .addBtn{
    padding-top: 1px;
  }
.temperatureRange .temSearch .el-input__inner{
  height: 35px ;
  line-height: 35px ;
}
.temperatureRange  .temSearch .el-input__icon {
  line-height: 35px;
}
/*弹窗*/
.temperatureRange .dialogCont .inputList .el-input__inner{
    height: 25px;
    line-height: 25px;
  }
.temperatureRange .dialogCont .temName{
  line-height: 30px;
}
.temperatureRange .dialogCont .inputList .el-input{
  width: 85%;
}
.temperatureRange .dialogCont .addCont{
    border: 1px solid #66b1ff;
  padding: 8px;
  width: 32.5%;
  margin:10px 3px 0 3px
}
.temperatureRange .dialogCont input::-webkit-outer-spin-button,
.temperatureRange .dialogCont input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.temperatureRange .dialogCont input[type="number"] {
  -moz-appearance: textfield;
}
.temperatureRange .dialogCont .addCont .el-button--mini.is-round{
  padding: 5px 8px;
}

</style>
