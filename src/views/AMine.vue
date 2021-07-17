<template>
    <div class="container">
        <el-button @click="dialogVisible = true">班级管理</el-button>
        <el-button @click="$router.push({name:'Akebiao'})">课表管理</el-button>
        <el-button @click="dialogVisible = true">考勤管理</el-button>
        <el-button type="danger" @click="dialogVisible = true">退出登录</el-button>

        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>是否退出登录</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleYes()">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"AMine",
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
        handleYes(){
            this.dialogVisible = false
            // this.$store.state.webSocket.close()
            this.$store.commit('$_removeStorage');    // 清除登录信息
            this.$store.commit('$_removeUser')
            this.$router.push({
	            name:'Login'
	        });
        }
    }
}
</script>

<style scoped>

</style>