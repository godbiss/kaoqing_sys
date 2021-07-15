<template>
    <div class="container">
    <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column label="课表管理">
        <el-table-column
        label="班级名"
        prop="banjiname">
        </el-table-column>
        <el-table-column
        label="院系"
        prop="yuanxi">
        </el-table-column>
        <el-table-column
        label="专业"
        prop="zhuanye">
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
            @click="handleEdit(scope.$index, scope.row)">选择</el-button>
        </template>
        </el-table-column>  
    </el-table-column>
    
  </el-table>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="85%"
  :before-close="handleClose">
  <div style="display:flex; flex-direction: column;justify-content:center; align-items:center">
<el-table
    :data="tableData2.filter(data => !search || data.name.toLowerCase().includes(search2.toLowerCase()))"
    :default-sort = "{prop: 'date', order: 'descending'}"
    style="width: 100%">
    <el-table-column label="课表管理">
        <el-table-column
        label="第一节课"
        prop="kechengname1">
        </el-table-column>
        <el-table-column
        label="第二节课"
        prop="kechengname2">
        </el-table-column>
        <el-table-column
        label="第三节课"
        prop="kechengname3">
        </el-table-column>
        <el-table-column
        label="第四节课"
        prop="kechengname4">
        </el-table-column>
        <el-table-column
        label="晚课一"
        prop="kechengname5">
        </el-table-column>
        <el-table-column
        label="上课时间"
        sortable
        prop="shangketime2">
        </el-table-column>
        <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
            <div>操作</div>
        </template>
        <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>

        </template>
        </el-table-column>  
    </el-table-column>
     </el-table>

     <el-button
            size="medium"
            type="success"
            @click="handleAdd()">+添加</el-button>
  </div>
     

</el-dialog>

    <el-dialog
    title="编辑"
    :visible.sync="dialogVisible2"
    width="85%"
    :before-close="handleClose2">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="第一节课" prop="kechengname1">
            <el-select v-model="ruleForm.kechengname1" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="第二节课" prop="kechengname2">
            <el-select v-model="ruleForm.kechengname2" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="第三节课" prop="kechengname3">
            <el-select v-model="ruleForm.kechengname3" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="第四节课" prop="kechengname4">
            <el-select v-model="ruleForm.kechengname4" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="晚课一" prop="kechengname5">
            <el-select v-model="ruleForm.kechengname5" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="上课时间" required>
            <el-col :span="11">
            <el-form-item prop="date">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>

    </el-dialog>
    </div>
</template>

<script>
import * as timeTool from "../utils/timeTool.js"
export default {
    name: "Akebiao",
    data() {
      return {
        tableData: [],
        search: '',
        dialogVisible: false,
        dialogVisible2: false,
        tableData2: [],
        search2: '',
        ruleForm: {
          kechengname1: null,
          kechengname2: null,
          kechengname3: null,
          kechengname4: null,
          kechengname5: null,
          date: '',
        },
        rules: {
          kechengname1: [
            { required: false},
          ],
          kechengname2: [
            { required: false},
          ],
          kechengname3: [
            { required: false},
          ],
          kechengname4: [
            { required: false},
          ],
          kechengname5: [
            { required: false},
          ],
          date: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
        },
        options: [],
        kechengid: null,
        reqbanjinum: null,
        reqbanjiname: null
      }
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.$axios.post("/api/kecheng/update", {
                id: this.kechengid,
                banjinum: this.reqbanjinum,
                banjiname: this.reqbanjiname,
                kechengname1: this.ruleForm.kechengname1,
                kechengname2: this.ruleForm.kechengname2,
                kechengname3: this.ruleForm.kechengname3,
                kechengname4: this.ruleForm.kechengname4,
                kechengname5: this.ruleForm.kechengname5,
                kechengname6: null,
                kechengname7: null,
                shangketime: this.ruleForm.date,
                
            }).then(res => {
                console.log(res)
                if(res.data.success === true){
                    this.$message("提交成功")
                    this.dialogVisible2 = false

                    this.reflashDialog()
                }else{
                    this.$message("提交失败")
                    
                }
            }).catch(err => {
                console.log(err)
                this.$message("提交异常")
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogVisible = true,
        this.$axios.get("/api/kecheng/"+row.banjinum).then(res => {
            console.log(res)
            var tabletemp = res.data
            tabletemp.forEach(element => {
                var datetemp = timeTool.parseDateStr(element.shangketime)
                element.shangketime1 = datetemp
                element.shangketime2 = ""+datetemp.getFullYear()+"-"+(datetemp.getMonth()+1)+"-"+datetemp.getDate()
            });
            this.tableData2 = tabletemp
        }).catch(err => {
            console.log(err)
        })

        this.reqbanjinum = row.banjinum
        this.reqbanjiname = row.banjiname
      },
      handleClose(done) {
            this.reqbanjinum = null
            this.reqbanjiname = null
            this.kechengid = null
            done();

      },
      handleClose2(done) {
            this.kechengid = null
            done();

      },
      handleDelete(index, row){
          console.log(index, row);
            this.$axios.delete("/api/kecheng/del/"+row.id).then(res => {
                console.log(res)
                this.reflashDialog()
            }).catch(err => {
                console.log(err)
            })

      },
      handleUpdate(index, row){
          console.log(index, row);
          this.dialogVisible2 = true,
          this.ruleForm.kechengname1 = row.kechengname1
          this.ruleForm.kechengname2 = row.kechengname2
          this.ruleForm.kechengname3 = row.kechengname3
          this.ruleForm.kechengname4 = row.kechengname4
          this.ruleForm.kechengname5 = row.kechengname5
          this.ruleForm.date = row.shangketime
          this.kechengid = row.id
      },
      handleAdd(){
          this.dialogVisible2 = true
          this.kechengid = null
      },
      reflashDialog(){
        //重新渲染
        this.$axios.get("/api/kecheng/"+this.reqbanjinum).then(res => {
        console.log(res)
        var tabletemp = res.data
        tabletemp.forEach(element => {
            var datetemp = timeTool.parseDateStr(element.shangketime)
            element.shangketime1 = datetemp
            element.shangketime2 = ""+datetemp.getFullYear()+"-"+(datetemp.getMonth()+1)+"-"+datetemp.getDate()
        });
        this.tableData2 = tabletemp
        }).catch(err => {
            console.log(err)
        })
      }

    },
    created() {
        this.$axios.get("/api/banji/list").then(res=>{
             console.log(res)
            this.tableData =res.data
        }).catch(err => {
            console.log(err)
        })
        this.$axios.get("/api/course/list").then(res=>{
            console.log(res)
            var optiontemp = res.data
            this.options.push({value:null, label:"无课"})
            optiontemp.forEach(element => {
                this.options.push({ value: element.coursename, label: element.coursename})
            });


        }).catch(err => {
            console.log(err)
        })
    },  
}
</script>

<style scoped>

</style>