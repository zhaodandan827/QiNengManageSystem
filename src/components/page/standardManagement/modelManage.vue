<template>
    <div class="table_box">
        <input id="Button1" type="button" @click="addCol()" value="增加列" />
        <input id="Button2" type="button" @click="delCol()" value="减少列" />
        <div style="width: 100% ;overflow: auto">


        <table id="tab1" width="100%"  class="table" style="table-layout:fixed; ">
            <thead>
               <tr>
                <th> </th>
                <th width="100">
                    <select style="width: 15%">
                        <option value =""></option>
                        <option value ="1">1</option>
                        <option value ="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <span>-</span>
                    <select style="width: 15%">
                        <option value =""></option>
                        <option value ="1">1</option>
                        <option value ="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <span>月</span>
                </th>
               </tr>
            </thead>
            <tbody>
            <tr>
                <td> hello</td>
                <td><input value=""></td>
            </tr>
            <tr>
                <td>world</td>
                <td><input value=""></td>
            </tr>
            <tr>
                <td>王子饼</td>
                <td><input value=""></td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            addCol() {
               var $th = $("<th>增加的列头</th>");
                var $col = $("<td><input value=\"\"></td>");
                $("#tab1>thead>tr").append($th);
                $("#tab1>tbody>tr").append($col);
            },
            delCol() {
                //移除最后一列
                if( document.getElementById("tab1").rows.item(0).cells.length.length >1){
                    $("#tab1 tr :last-child").remove();
                }else{
                    this.$message({
                        message: '已经是最后一列了',
                        type: 'warning'
                    });
                }
            }
        }
    }
</script>
<style type="text/css">
    table
    {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
    }
    table td, table th
    {
        border: 1px solid #cad9ea;
        color: #666;
        height: 30px;
    }
    table thead th
    {
        background-color: #CCE8EB;
        width: 100px;
    }
    table tr:nth-child(odd)
    {
        background: #fff;
    }
    table tr:nth-child(even)
    {
        background: #F5FAFA;
    }
</style>