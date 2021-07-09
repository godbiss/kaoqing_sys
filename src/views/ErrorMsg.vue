<template>
  <el-container>
      <el-row>
        <el-col :span="24"> <el-page-header @back="goBack" content="错误信息">
      </el-page-header
    ></el-col>
      </el-row>
   <el-row>
     <el-col :span="24"><h1>{{ this.$store.state.errorMsg }}</h1></el-col>
   </el-row>
    
  </el-container>
</template>

<script>
export default {
  name: "ErrorMsg",
  methods: {
    goBack() {
      this.$router.push({path: "/"});
    },
  },
  destroyed() {
    this.$store.commit("setErrorMsg", "");
  },
};
</script>

<style scoped>
</style>