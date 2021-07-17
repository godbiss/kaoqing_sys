<template>
  <div class="Qcontainer">
    <OSHeader title="请假详情"></OSHeader>
    <div class="title">
        请假信息列表
    </div>
    <van-cell-group>
        <van-cell :title="item.id" :value="item.shenhe" :label="item.qjtime1 + ' 至 ' + item.qjtime2" v-for="item of list" :key="item.id" @click="onClick(item)" />
    </van-cell-group>
  </div>
</template>

<script>
import OSHeader from "../components/OSHeader.vue";
export default {
    name:"QingjiaList",
    data(){
        return{
            list: [],
        }
    },
    methods:{
        onClick(item){
            this.$router.push({name:"QingjiaPanel", params:{
                item: item
            }})
        }
    },
    components:{
        OSHeader,
    },
    created() {
        this.$axios.get("/api/qingjiadan/student/list/" + this.$store.state.user.codenum)
        .then(res => {
            console.log(res)
            this.list = res.data

        }).catch(err => {
            console.log(err)
        })
    },
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