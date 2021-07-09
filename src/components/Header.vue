<template>
  <el-header height="10vh">
      <!-- Header content -->
      <el-row style="height: 100%">
        <el-col :xs="5" style="height: 100%"
          ><el-image
            style="height: 100%; width: 100%"
            :src="require('../assets/logo.png')"
            fit="fill"
            lazy
          ></el-image
        ></el-col>
        <el-col :xs="17" style="height: 100%">
          <div class="title">学生考勤管理系统</div>
        </el-col>
      </el-row>
    </el-header>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped>
.title {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#409EFF;
  font: 20px Extra large;
  }

  .el-header {
    margin: 8px;
    border-bottom: 1px solid;
    border-color: #DCDFE6;
  }
</style>