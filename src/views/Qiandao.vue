<template>
    <div class="container">
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
</van-pull-refresh>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多信息"
        @load="onLoad"
    >
    <van-cell v-for="item in list" :key="item.id" :title="item.kechengname" :label="item.riqi" :value="item.iskuangke === 0 ? '已签到' : '未签到'" clickable @click="handleCellClick(item)"  />
    </van-list>

        <bottom-nav :idx=1></bottom-nav>
    </div>
</template>

<script>
import BottomNav from '../components/BottomNav'
export default {
    name:"Qiandao",
    data(){
        return{
            list: [],
            isLoading: false,
            finished: false,
            loading: false
        }
    },
    methods:{
    onRefresh() {
        // 异步更新数据
        this.$axios.get('/api/kaoqinlog/student/list/'+this.$store.state.user.codenum)
        .then(res => {
            console.log(res)
            this.list = res.data
            this.isLoading = true
        }).catch(err => {
            console.log(err)
        })
    },
        handleCellClick(item){
            console.log(item)
            this.$router.push({name:"QiandaoPanel", params:{
                item: item
            }})
        },
    onLoad() {
        // 异步更新数据
        this.$axios.get('/api/kaoqinlog/student/list/'+this.$store.state.user.codenum)
        .then(res => {
            console.log(res)
            this.list = res.data
        }).catch(err => {
            console.log(err)
        })

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成

        this.finished = true;


        }
    },
    components:{
        BottomNav,
        
    }
}
</script>

<style scoped>

</style>