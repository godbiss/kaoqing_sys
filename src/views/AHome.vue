<template>
    <el-container>
    <el-header height="10vh">
      <!-- Header content -->
      <el-row :gutter="20" style="height:100%; padding: 10px 10px;" type="flex" justify="space-between" align="middle">
        <el-col :span="2" :offset="0" style="height:100%"
          ><el-image
            style="height: 100%; width: 100%"
            :src="require('../assets/logo.png')"
            fit="fill"
            lazy
          ></el-image
        ></el-col>
        <el-col :span="12" :offset="0">学生考勤管理系统</el-col>
        <el-col :span="3" :offset="0">
        <el-avatar :size="60" shape="circle" fit="fill">{{ $store.state.user.username }}</el-avatar>
            
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="18vw" style="padding: 20px 8px">
        <!-- Aside content -->
        <el-row style="height: 100%">
        <el-col :span="24" style="height: 100%">
            <h5>导航列表</h5>
            <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router>
            <el-menu-item index="1" :route="{name:'AHome'}">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4" :route="{name:'AMine'}">
                <i class="el-icon-setting"></i>
                <span slot="title">用户设置</span>
            </el-menu-item>
            </el-menu>
        </el-col> 

        </el-row>
      </el-aside>
      <el-container>
        <el-main style="height: 90vh">
          <!-- Main content -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
    name:"AHome",
     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>
    
    .el-header .el-row{
        display: flex;
    }
    .el-header .el-col{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-size: 20px;
        color: #409EFF;
    }
    .el-aside h5{
        color: #909399;
        text-align: center;
        
    }
    .el-menu-vertical-demo{
        width: 100%;
        height: 90%;
    }
</style>