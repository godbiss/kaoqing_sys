<template>
<div class="container">
    <el-row>
        <el-col :span="0" :offset="0"><i class="el-icon-arrow-left" @click="goback"></i></el-col>
        <el-col :span="24" :offset="0">{{ title }}</el-col>
    </el-row>
</div>

    
</template>

<script>
export default {
    name:"OSHeader",
    props:['title'],
    methods: {
        goback(){
            this.$router.go(-1)
        }
    },
}
</script>

<style scoped>
    .container{
        position: sticky;
        top: 0;
        z-index: 1000;
        box-sizing: border-box;

        background-color: #fff;
    }
    .el-row{
        height: 6vh;
        background-color: 000;

    }
    .el-col:nth-child(1){
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;

    }
    .el-col:nth-child(2){
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-size: 18px;
        color: #303133;
    }
    i{
        transform: scale(1.5);
        margin-left: 18px;
    }
</style>