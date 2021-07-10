<template>
    <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="上课时间"
      prop="shangketime">
    </el-table-column>
    <el-table-column
      label="课程名"
      prop="kechengname1">
    </el-table-column>
        <el-table-column
      label="班级"
      prop="banji">
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
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import * as timeTool from '../utils/timeTool.js'
export default {
    name: "Tkaoqin",
 data() {
      return {
        tableData: [],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created() {
        this.$axios.get('/api/kecheng/teacher/'+this.$store.state.user.codenum)
        .then(res => {
            console.log(res)
            this.tableData = res.data
            this.tableData.forEach(element => {
                element.shangketime = timeTool.parseDateStr(element.shangketime) 
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