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
          <div v-if="scope.row.kechenglock === 1">
            <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)">开始上课</el-button>
          </div>
          <div v-else>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">马上下课</el-button>
          </div>
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
      label="状态">
    <template slot-scope="scope">
      <div v-if="scope.row.isKuangke === 1" style="color: #F56C6C">
        旷课
      </div>
      <div v-else-if="scope.row.isKuangke === 0" style="color: #67C23A">
        已到课
      </div>
      <div v-else-if="scope.row.isKuangke === 2" style="color: #909399">
        未签到
      </div>
    </template>
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
          @click="handleZhuangtai(scope.$index, scope.row)">修改状态</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleTixin(scope.$index, scope.row)">提醒签到</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-dialog>

  <el-dialog
  title="选择签到方式"
  :visible.sync="dialogVisible3"
  width="30%"
  :before-close="handleQiandaoClose">
        <vue-qr :logo-src="logoSrc"
        :size="191"
        :margin="0"
        :auto-color="true"
        :dot-scale="1"
        :text="appSrc"
        v-show="showQr" />

  <span slot="footer" class="dialog-footer">
    <el-button
    size="mini"
    @click="handleButton">按钮签到</el-button>
  <el-button
    size="mini"
    type="primary"
    @click="handleQrCode">二维码签到</el-button>
  </span>
</el-dialog>


</div>
    
</template>

<script>
import VueQr from 'vue-qr';
import * as timeTool from '../utils/timeTool.js'

export default {
    name: "Tkaoqin",
 data() {
      return {
        dialogVisible: false,
        dialogVisible3: false,
        tableData: [],
        tableData2: [],
        search: '',
        dialogbanjinum:null,
        dialogkechengname:null,
        dialogriqi:null,
        logoSrc:"",
        appSrc: "",
        showQr: false
      }
    },
    components: {
      VueQr,
    }, 
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogbanjinum = row.banjinum
        this.dialogkechengname = row.kechengname,
        this.dialogriqi = row.shangketime.split(" ")[0]
        this.$axios.get('/api/kaoqinlog/teacher/list', {
          params: {
            banjinum: row.banjinum,
            kechengname: row.kechengname,
            riqi: row.shangketime.split(" ")[0],
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

        this.dialogbanjinum = row.banjinum
        this.dialogkechengname = row.kechengname,
        this.dialogriqi = row.shangketime.split(" ")[0]

        if(row.kechenglock === 1){
          this.dialogVisible3 = true
        }
        
        if(row.kechenglock === 0){
            this.$axios.post("/api/kaoqinlog/teacher/update/kechenglock", {
            banjinum: row.banjinum,
            kechengname: row.kechengname,
            riqi: row.shangketime.split(" ")[0],
            kechenglock: 1
          }).then(res => {
            console.log(res)

            //重新渲染
            this.getTeacherList()

            this.showQr = false
          }).catch(err => {
            console.log(err)
          })

        }
        
      },
      handleClose(done) {
        this.tableData2 = [];
        this.dialogbanjinum = null
        this.dialogkechengname = null
        this.dialogriqi = null
        done()
      },
      handleZhuangtai(index, row){
        console.log(index, row);
        //修改状态与旷课数
        this.$axios.post("/api/kaoqinlog/teacher/update", {
          id: row.kaoqinlogid,
          kechengname: this.dialogkechengname,
          codenum: row.codenum,
          isKuangke: row.isKuangke === 0 ? 1 : 0,
          kuangkenum: row.kuangkenum
        }).then(res => {
          console.log(res)
          if(res.data.success === true){
            this.$message("修改成功")

            //列表重新渲染
            this.$axios.get('/api/kaoqinlog/teacher/list', {
              params: {
                banjinum: this.dialogbanjinum,
                kechengname: this.dialogkechengname,
                riqi: this.dialogriqi,
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
          }else{
            this.$message("修改失败")
          }
        }).catch(err => {
          console.log(err)
        })

      },
      handleButton(){
        //解锁签到
          this.$axios.post("/api/kaoqinlog/teacher/update/kechenglock", {
            banjinum: this.dialogbanjinum,
            kechengname: this.dialogkechengname,
            riqi: this.dialogriqi,
            kechenglock: 0
          }).then(res => {
            console.log(res)

            //重新渲染
            this.getTeacherList()

            //修改签到类型
            this.$axios.post("/api/kaoqinlog/teacher/update/qiandaotype", {
              banjinum: this.dialogbanjinum,
              kechengname: this.dialogkechengname,
              riqi: this.dialogriqi,
              qiandaotype: 0
            }).then(res => {
              console.log(res)
              if(res.data.success === true){
                this.$message('修改成功')
                this.showQr = false
              }else{
                this.$message('修改失败')
              }
            }).catch(err => {
              console.log(err)
              this.$message('服务器异常')
            })
          }).catch(err => {
            console.log(err)
          })


      },
      handleQrCode(){
          this.$axios.post("/api/kaoqinlog/teacher/update/kechenglock", {
            banjinum: this.dialogbanjinum,
            kechengname: this.dialogkechengname,
            riqi: this.dialogriqi,
            kechenglock: 0
          }).then(res => {
            console.log(res)

            //重新渲染
            this.getTeacherList()

            //修改签到类型
            this.$axios.post("/api/kaoqinlog/teacher/update/qiandaotype", {
              banjinum: this.dialogbanjinum,
              kechengname: this.dialogkechengname,
              riqi: this.dialogriqi,
              qiandaotype: 1
            }).then(res => {
              console.log(res)
              if(res.data.success === true){
                this.$message('修改成功')

                this.showQr = true
                this.appSrc = this.dialogkechengname
              }else{
                this.$message('修改失败')
              }
            }).catch(err => {
              console.log(err)
              this.$message('服务器异常')
            })
          }).catch(err => {
            console.log(err)
          })
      },
      handleTixin(index, row){
        console.log(index, row);
      },
      handleQiandaoClose(done){
        this.dialogbanjinum = null
        this.dialogkechengname = null
        this.dialogriqi = null
        done()
      },
      getTeacherList(){
        this.$axios.get('/api/kecheng/teacher/'+this.$store.state.user.codenum)
        .then(res => {
            console.log(res)
            this.tableData = res.data
            this.tableData.forEach(element => {
                var shangketimetemp = timeTool.parseDateStr(element.shangketime) 
                if(element.kechengname1 != null){
                  var start = timeTool.parseDateStr(element.shangketime) 
                  var end = timeTool.parseDateStr(element.shangketime) 
                  start.setHours(8)
                  start.setMinutes(0)
                  start.setSeconds(0)
                  end.setHours(9)
                  end.setMinutes(50)
                  end.setSeconds(0)
                  
                  //根据日期修改课程状态
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now >= start && now <= end){
                        element.zhuangtai = "正在上课"
                    }else if(now > end){
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
                  var start = timeTool.parseDateStr(element.shangketime) 
                  var end = timeTool.parseDateStr(element.shangketime) 
                  start.setHours(10)
                  start.setMinutes(10)
                  start.setSeconds(0)
                  end.setHours(12)
                  end.setMinutes(0)
                  end.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now >= start && now <= end){
                        element.zhuangtai = "正在上课"
                    }else if(now > end){
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
                                    var start = timeTool.parseDateStr(element.shangketime) 
                  var end = timeTool.parseDateStr(element.shangketime) 
                  start.setHours(14)
                  start.setMinutes(30)
                  start.setSeconds(0)
                  end.setHours(16)
                  end.setMinutes(20)
                  end.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now >= start && now <= end){
                        element.zhuangtai = "正在上课"
                    }else if(now > end){
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
                                    var start = timeTool.parseDateStr(element.shangketime) 
                  var end = timeTool.parseDateStr(element.shangketime) 
                  start.setHours(16)
                  start.setMinutes(30)
                  start.setSeconds(0)
                  end.setHours(18)
                  end.setMinutes(10)
                  end.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now >= start && now <= end){
                        element.zhuangtai = "正在上课"
                    }else if(now > end){
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
                  var start = timeTool.parseDateStr(element.shangketime) 
                  var end = timeTool.parseDateStr(element.shangketime) 
                  start.setHours(19)
                  start.setMinutes(0)
                  start.setSeconds(0)
                  end.setHours(20)
                  end.setMinutes(0)
                  end.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                     if(now >= start && now <= end){
                        element.zhuangtai = "正在上课"
                    }else if(now > end){
                        element.zhuangtai = "已下课"
                      }
                  }else if( now.getFullYear() < start.getFullYear() || now.getMonth() < start.getMonth() || now.getDate() < start.getDate() ){
                    element.zhuangtai = "未上课"
                  }else if( now.getFullYear() > start.getFullYear() || now.getMonth() > start.getMonth() || now.getDate() > start.getDate() ){
                    element.zhuangtai = "已下课"
                  }
                  element.shangketime = "" + shangketimetemp.getFullYear() + "-" + (shangketimetemp.getMonth()+1) + "-" + shangketimetemp.getDate() + " 19:00~21:00"
                  element.kechengname = element.kechengname5
                }
                if(element.kechengname6 != null){
                  var start = timeTool.parseDateStr(element.shangketime) 
                  var end = timeTool.parseDateStr(element.shangketime) 
                  start.setHours(20)
                  start.setMinutes(0)
                  start.setSeconds(0)
                  end.setHours(21)
                  end.setMinutes(0)
                  end.setSeconds(0)
                  
                  var now = new Date();
                  if( now.getFullYear() == start.getFullYear() && now.getMonth() == start.getMonth() && now.getDate() == start.getDate() ){
                    if(now >= start && now <= end){
                        element.zhuangtai = "正在上课"
                    }else if(now > end){
                        element.zhuangtai = "已下课"
                      }
                  }else if( now.getFullYear() < start.getFullYear() || now.getMonth() < start.getMonth() || now.getDate() < start.getDate() ){
                    element.zhuangtai = "未上课"
                  }else if( now.getFullYear() > start.getFullYear() || now.getMonth() > start.getMonth() || now.getDate() > start.getDate() ){
                    element.zhuangtai = "已下课"
                  }
                  element.shangketime = "" + shangketimetemp.getFullYear() + "-" + (shangketimetemp.getMonth()+1) + "-" + shangketimetemp.getDate() + " 19:00~21:00"
                  element.kechengname = element.kechengname6
                }

            });
        })
        .catch(err => {
            console.log(err)
        })
      }

    },
    created() {
        this.getTeacherList()
    },
}
</script>

<style scoped>

</style>