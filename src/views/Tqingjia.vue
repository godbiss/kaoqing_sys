<template>
  <div class="container">
      <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      label="班级名称"
      prop="banjiname"
      width="180">
    </el-table-column>
    <el-table-column
      label="学号"
      prop="codenum"
      width="180">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="stdname"
      width="180">
    </el-table-column>
    <el-table-column
      label="起始时间"
      prop="qjtime1"
      width="180">
    </el-table-column>
    <el-table-column
      label="结束时间"
      prop="qjtime2"
      width="180">
    </el-table-column>
    <el-table-column
      label="审核"
      prop="shenhe"

      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">审核</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
  title="请假审核"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
<el-form ref="form" :model="form" label-width="80px" :rules="rules">
  <el-form-item label="班级">
    <el-input v-model="form.banjinum" disabled></el-input>
  </el-form-item>
  <el-form-item label="学号">
    <el-input v-model="form.codenum" disabled></el-input>
  </el-form-item>
    <el-form-item label="姓名">
    <el-input v-model="form.stdname" disabled></el-input>
  </el-form-item>
    <el-form-item label="起始时间">
    <el-input v-model="form.qjtime1" disabled></el-input>
  </el-form-item>
    <el-form-item label="结束时间">
    <el-input v-model="form.qjtime2" disabled></el-input>
  </el-form-item>
    <el-form-item label="请假理由">
    <el-input type="textarea" v-model="form.qingjiacontent" disabled></el-input>
  </el-form-item>
  <el-form-item label="审核" prop="shenhe">
      <el-select v-model="form.shenhe" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
    <el-form-item label="审核理由" prop="shenhecontent">
    <el-input type="textarea" v-model="form.shenhecontent" ></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="onSubmit">提 交</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "Tqingjia",
  data() {
    return {
        tableData: [],
        centerDialogVisible: false,
        form: {
            // banjinum: "",
            // codenum: "",
            // stdname: "",
            // qjtime1: "",
            // qjtime2: "",
            // qingjiacontent: "",
        },
        options: [{
          value: '通过',
          label: '通过'
        }, {
          value: '未通过',
          label: '未通过'
        }],
        rules: {
            shenhe: { required: true, message: '请选择审核信息', trigger: 'blur' },
            shenhecontent: { required: true, message: '请填写审核信息', trigger: 'blur' }
        }
      }
  },
  methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.centerDialogVisible = true

        this.form = row
      },
      tableRowClassName({row, rowIndex}) {
        if (row.shenhe === "未审核") {
          return 'warning-row';
        } else if (row.shenhe === "通过") {
          return 'success-row';
        } 
        return '';
      },
      onSubmit() {
          this.$axios.post("/api/qingjiadan/teacher/update", this.form)
          .then(res => {
              console.log(res)
              if(res.data.success === true){
                  this.$message("操作成功")
              }else{
                  this.$message("操作失败")
              }
          }).catch(err => {
              this.$message("服务器异常")
          })
          this.centerDialogVisible = false
      }
  },
  created () {
      this.$axios.get("/api/qingjiadan/teacher/list/" + this.$store.state.user.username)
      .then(res => {
          console.log(res)
          this.tableData = res.data
      }).catch(err => {
        console.log(err)
      })
  }
};
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>