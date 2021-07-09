<template>
  <el-table
    :data="tableData.filter(data => !search || data.banjiname.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    stripe >
    <el-table-column
      label="班级名称"
      prop="banjiname">
    </el-table-column>
    <el-table-column
      label="班级代号"
      prop="banjinum">
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
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">加入</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">退出</el-button> -->
            <div v-if="scope.row.banjinum === $store.state.user.banjinum">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)" disabled>已加入班级</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">退出</el-button>
            </div>
            <div v-else>
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">加入班级</el-button>
            </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name:'TinterBanji',
    data() {
      return {
        tableData: [],
        search: ''
      }
    },
    methods: {
      //加入班级处理
      handleEdit(index, row) {
        console.log(index, row);
        let userTemp = this.$store.state.user
        userTemp.banjinum = row.banjinum
        this.$axios.post("/api/user", userTemp)
        .then(res => {
            console.log(res)
            if(res.data.success === true){
                this.$store.state.user = userTemp
                this.$store.commit('$_setUser', userTemp);
            }

        })
        .catch(err => {
            console.error(err); 
        })
      },
      //退出班级处理
      handleDelete(index, row) {
        console.log(index, row);
        let userTemp = this.$store.state.user
        userTemp.banjinum = ""
        this.$axios.post("/api/user", userTemp)
        .then(res => {
            console.log(res)
            if(res.data.success === true){
                this.$store.state.user = userTemp
                this.$store.commit('$_setUser', userTemp);
            }

        })
        .catch(err => {
            console.error(err); 
        })
      },
    },
    created() {
        this.$axios.get('/api/banji/list')
        .then(res => {
            console.log(res)
            this.tableData = res.data
        })
        .catch(err => {
            console.error(err); 
        })
    },
  }
</script>