<template>
  <el-container direction="vertical">
    <Header></Header>

    <el-main>
      <!-- Main content -->
      <router-view />
    </el-main>

  </el-container>
</template>

<script>
import Header from "../components/Header";
import BottomNav from '../components/BottomNav'
export default {
    name: 'StdHome',
    components: {
        Header,
        BottomNav,
    },
    created(){

    }
}
</script>

<style scoped> 
.el-main {
  height: 80vh;
}

</style>
