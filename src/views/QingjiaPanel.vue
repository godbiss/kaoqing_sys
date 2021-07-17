<template>
  <div class="Qcontainer">
    <OSHeader title="请假详情"></OSHeader>
    <div class="title">
        请假信息详情
    </div>
    <van-cell-group>
        <van-cell title="班级号" :value="item.banjinum"/>
        <van-cell title="学号" :value="item.codenum"/>
        <van-cell title="起始时间" :value="item.qjtime1"/>
        <van-cell title="结束时间" :value="item.qjtime2"/>
        <van-cell title="请假原因" :label="item.qingjiacontent"/>
        <van-cell title="审核状态" :value="item.shenhe"/>
        <van-cell title="审核信息" :label="item.shenhecontent"/>
    </van-cell-group>
  </div>
</template>

<script>
import OSHeader from "../components/OSHeader.vue";
export default {
    name:"QingjiaPanel",
    data(){
        return{
            item: null
        }
    },
    components:{
        OSHeader,
    },
    created(){
        console.log(this.$route.params.item)
        this.item = this.$route.params.item
    }
}
</script>

<style scoped>
    div.Qcontainer{
        background-color: #f7f8fa;
        height: 100vh;
    }
    div.title{
        margin: 10px 18px;
    }
</style>