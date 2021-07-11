<template>
<div class="container">
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="上课时间"
      prop="shangketime">
    </el-table-column>
    <el-table-column
      label="课程名"
      prop="kechengname">
    </el-table-column>
      <el-table-column
      label="班级"
      prop="banji">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="zhuangtai">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">考勤情况</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleDelete(scope.$index, scope.row)">发起考勤</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="90%"
  :before-close="handleClose">
  <el-table
    :data="tableData2.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="学号"
      prop="codenum">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="stdname">
    </el-table-column>
      <el-table-column
      label="班级"
      prop="banjiname">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="isKuangke">
    </el-table-column>
      <el-table-column
      label="旷课次数"
      prop="kuangkenum">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">考勤情况</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleDelete(scope.$index, scope.row)">提醒签到</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-dialog>
</div>
    
</template>

<script>
import * as timeTool from '../utils/timeTool.js'

export default {
    name: "Tkaoqin",
 data() {
      return {
        dialogVisible: false,
        tableData: [],
        tableData2: [],
        search: '',
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.$axios.get('/api/kaoqinlog/teacher/list', {
          params: {
            banjinum: row.banjinum,
            kechengname: row.kechengname,
            riqi: "",
            teacher: this.$store.state.user.codenum
          }
        })
        .then(res => {
          console.log(res)
          this.tableData2 = res.data
        })
        .catch(err => {
          console.log(err)
        })

        this.dialogVisible = true
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClose(done) {
        done()
      },

    },
    created() {
      console.log('created')
        this.$axios.get('/api/kecheng/teacher/'+this.$store.state.user.codenum)
        .then(res => {
            console.log(res)
            this.tableData = res.data
            this.tableData.forEach(element => {
                var shangketimetemp = timeTool.parseDateStr(element.shangketime) 
                if(element.kechengname1 != null){
                  var start = shangketimetemp
                  var end = shangketimetemp
                  start.setHours(8)
                  start.setMinutes(0)
                  start.setSeconds(0)
                  start.setHours(9)
                  start.setMinutes(50)
                  start.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now.getHours() >= start.getHours() && now.getHours() <= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() <= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds <= end.getSeconds()){
                        element.zhuangtai = "正在上课"
                    }else if(now.getHours() >= start.getHours() && now.getHours() >= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() >= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds >= end.getSeconds()){
                        element.zhuangtai = "已下课"
                      }
                  }else if( now.getFullYear() < start.getFullYear() || now.getMonth() < start.getMonth() || now.getDate() < start.getDate() ){
                    element.zhuangtai = "未上课"
                  }else if( now.getFullYear() > start.getFullYear() || now.getMonth() > start.getMonth() || now.getDate() > start.getDate() ){
                    element.zhuangtai = "已下课"
                  }


                  element.shangketime = "" + shangketimetemp.getFullYear() + "-" + (shangketimetemp.getMonth()+1) + "-" + shangketimetemp.getDate() + " 8:00~9:50"
                  element.kechengname = element.kechengname1
                }
                if(element.kechengname2 != null){
                  var start = shangketimetemp
                  var end = shangketimetemp
                  start.setHours(8)
                  start.setMinutes(0)
                  start.setSeconds(0)
                  start.setHours(9)
                  start.setMinutes(50)
                  start.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now.getHours() >= start.getHours() && now.getHours() <= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() <= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds <= end.getSeconds()){
                        element.zhuangtai = "正在上课"
                    }else if(now.getHours() >= start.getHours() && now.getHours() >= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() >= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds >= end.getSeconds()){
                        element.zhuangtai = "已下课"
                      }
                  }else if( now.getFullYear() < start.getFullYear() || now.getMonth() < start.getMonth() || now.getDate() < start.getDate() ){
                    element.zhuangtai = "未上课"
                  }else if( now.getFullYear() > start.getFullYear() || now.getMonth() > start.getMonth() || now.getDate() > start.getDate() ){
                    element.zhuangtai = "已下课"
                  }


                  element.shangketime = "" + shangketimetemp.getFullYear() + "-" + (shangketimetemp.getMonth()+1) + "-" + shangketimetemp.getDate() + " 10:10~12:00"
                  element.kechengname = element.kechengname2
                }
                if(element.kechengname3 != null){
                                    var start = shangketimetemp
                  var end = shangketimetemp
                  start.setHours(8)
                  start.setMinutes(0)
                  start.setSeconds(0)
                  start.setHours(9)
                  start.setMinutes(50)
                  start.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now.getHours() >= start.getHours() && now.getHours() <= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() <= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds <= end.getSeconds()){
                        element.zhuangtai = "正在上课"
                    }else if(now.getHours() >= start.getHours() && now.getHours() >= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() >= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds >= end.getSeconds()){
                        element.zhuangtai = "已下课"
                      }
                  }else if( now.getFullYear() < start.getFullYear() || now.getMonth() < start.getMonth() || now.getDate() < start.getDate() ){
                    element.zhuangtai = "未上课"
                  }else if( now.getFullYear() > start.getFullYear() || now.getMonth() > start.getMonth() || now.getDate() > start.getDate() ){
                    element.zhuangtai = "已下课"
                  }
                  element.shangketime = "" + shangketimetemp.getFullYear() + "-" + (shangketimetemp.getMonth()+1) + "-" + shangketimetemp.getDate() + " 14:30~16:20"
                  element.kechengname = element.kechengname3
                }
                if(element.kechengname4 != null){
                                    var start = shangketimetemp
                  var end = shangketimetemp
                  start.setHours(8)
                  start.setMinutes(0)
                  start.setSeconds(0)
                  start.setHours(9)
                  start.setMinutes(50)
                  start.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now.getHours() >= start.getHours() && now.getHours() <= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() <= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds <= end.getSeconds()){
                        element.zhuangtai = "正在上课"
                    }else if(now.getHours() >= start.getHours() && now.getHours() >= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() >= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds >= end.getSeconds()){
                        element.zhuangtai = "已下课"
                      }
                  }else if( now.getFullYear() < start.getFullYear() || now.getMonth() < start.getMonth() || now.getDate() < start.getDate() ){
                    element.zhuangtai = "未上课"
                  }else if( now.getFullYear() > start.getFullYear() || now.getMonth() > start.getMonth() || now.getDate() > start.getDate() ){
                    element.zhuangtai = "已下课"
                  }
                  element.shangketime = "" + shangketimetemp.getFullYear() + "-" + (shangketimetemp.getMonth()+1) + "-" + shangketimetemp.getDate() + " 16:30~18:20"
                  element.kechengname = element.kechengname4
                }
                if(element.kechengname5 != null){
                                    var start = shangketimetemp
                  var end = shangketimetemp
                  start.setHours(8)
                  start.setMinutes(0)
                  start.setSeconds(0)
                  start.setHours(9)
                  start.setMinutes(50)
                  start.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now.getHours() >= start.getHours() && now.getHours() <= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() <= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds <= end.getSeconds()){
                        element.zhuangtai = "正在上课"
                    }else if(now.getHours() >= start.getHours() && now.getHours() >= end.getHours() && now.getMinutes() >= start.getMinutes() && now.getMinutes() >= end.getMinutes() 
                      && now.getSeconds() >= start.getMinutes() && now.getSeconds >= end.getSeconds()){
                        element.zhuangtai = "已下课"
                      }
                  }else if( now.getFullYear() < start.getFullYear() || now.getMonth() < start.getMonth() || now.getDate() < start.getDate() ){
                    element.zhuangtai = "未上课"
                  }else if( now.getFullYear() > start.getFullYear() || now.getMonth() > start.getMonth() || now.getDate() > start.getDate() ){
                    element.zhuangtai = "已下课"
                  }
                  element.shangketime = "" + shangketimetemp.getFullYear() + "-" + (shangketimetemp.getMonth()+1) + "-" + shangketimetemp.getDate() + " 19:00~21:00"
                  element.kechengname = element.kechengname4
                }

            });
        })
        .catch(err => {
            console.log(err)
        })
    },
}
</script>

<style scoped>

</style>