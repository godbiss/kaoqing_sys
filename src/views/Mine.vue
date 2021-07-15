<template>
  <div class="container">
    <div class="avator">
      <el-avatar fit="fill" :size="100"> {{ this.$store.state.user.username }} </el-avatar>
    </div>
    <el-row style="height:8%;" v-for="(item, index) of options" :key="index" @click.native="$router.push(item.push)">
      <el-col style="height: 100%;align-items: flex-start" :span="12">{{ item.oname }}</el-col>
      <el-col style="height: 100%;align-items: flex-end" :span="12"><i class="el-icon-caret-right"></i></el-col>
    </el-row>
     <el-row style="height:8%;" @click.native="quit()">
      <el-col style="height: 100%;align-items: flex-start" :span="12">退出登录</el-col>
      <el-col style="height: 100%;align-items: flex-end" :span="12"><i class="el-icon-caret-right"></i></el-col>
    </el-row>

    
    <Bottom-Nav :idx="3"></Bottom-Nav>
  </div>
</template>

<script>
import BottomNav from "../components/BottomNav";
export default {
  name: "Mine",
  data() {
      return{
        options:[
            {
                oname: "课程报告",
                push:""
            },
            {
                oname: "学生请假",
                push:"/std/qingjia"
            },
            {
                oname: "选择班级",
                push:"/stdHome/interBanji"
            },
        ]
      }
  },
  methods: {
    quit(){
        this.$dialog.confirm({
        title: '提示',
        message: '确认退出登录？'
        }).then(() => {
        // on confirm
        this.$store.state.webSocket.close()
        this.$store.commit('$_removeStorage');    // 清除登录信息
        this.$store.commit('$_removeUser')
	     this.$router.push({
	         name:'Login'
	     });
         this.$toast("退出登录")
        }).catch(() => {
        // on cancel
        });
    }
    },
  components: {
    BottomNav,
  },
};
</script>

<style scoped>
.container {
  height: 80vh;
  z-index: 1;
}
.avator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
.el-row {
    border: 1px solid;
    border-radius: 4px;
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    border-color: #E4E7ED;
}
.el-col{
    display: flex;
    flex-direction: column;
    align-items: right;
    justify-content: center;
    padding: 0 1rem;

    font: 	13px;
    color: #606266;
}
</style>