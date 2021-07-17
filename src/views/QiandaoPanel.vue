<template>
<div class="container">
    <el-page-header @back="goBack">
    </el-page-header>
  <van-panel :title="item.kechengname" :desc="item.desc" :status="item.kechenglock === 0 ? '签到开放' : '签到关闭'">
      <div class="content" v-if="item.iskuangke === 0" style="color:#67C23A">
          已签到
      </div>
      <div class="content" v-if="item.iskuangke === 1" style="color:#F56C6C">
          旷课
      </div>
      <div class="content" v-if="item.iskuangke === 2" style="color:#909399">
          未签到
      </div>
      <div class="content" v-if="item.kechenglock === 0 && item.qiandaotype ===0">
            <el-button type="primary" @click="handleQiandao" v-show="disable">按钮签到</el-button>
      </div>
      <div class="content" v-else-if="item.kechenglock === 0 && item.qiandaotype ===1">
            <el-button type="primary" @click="handleQrScan" v-show="disable">二维码签到</el-button>
      </div>
      <div class="content" v-else-if="item.kechenglock === 0 && item.qiandaotype ===2">
            <el-button type="primary">刷脸签到</el-button>
      </div>
        <div class="content" v-show="!disable">
            不在签到时间内或教师未开启签到
        </div>
      <!-- <el-button type="primary" @click="handleQiandao">按钮签到</el-button> -->
</van-panel>
</div>

</template>

<script>
export default {
    name: "QiandaoPanel" ,
    data() {
        return {
            item: null,
            isLoading: false,
            disable: false
        }
    },
    methods: {
        goBack() {
            this.$router.push({name:"Qiandao"})
        },
        handleQiandao(){
            this.$axios.post("/api/kaoqinlog/student/update", {
                id: this.item.id,
                codenum: this.item.codenum,
                kechengname: this.item.kechengname,
                isKuangke: 0,
                kuangkenum: this.item.kuangkenum,
                qiandaotype: 0
            }).then(res => {
                console.log(res)
                if(res.data.success === true){
                    this.$toast("签到成功")
                    this.$router.push({name:"Qiandao"})
                }else{
                    this.$toast("签到失败")
                }
            }).catch(err => {
                console.log(err)
            })
        },
        handleQrScan(){
            this.$router.push({name: "QrScan", params:{
                id: this.item.id,
                kuangkenum: this.item.kuangkenum,
                qiandaotype: 1
            }})
        }
    },
    created() {
        console.log(this.$route.params)
        this.item = this.$route.params.item

        var now = new Date()

        var descTemp = "上课时间:"
        if(this.item.courseindex === 1){
            descTemp += "8:00 ~ 9:50"
            
            var now = new Date()
            var start = new Date()
            var end = new Date()
            start.setHours(8)
            start.setMinutes(0)
            start.setSeconds(0)
            end.setHours(9)
            end.setMinutes(50)
            end.setSeconds(0)
            if(now.getFullYear() === this.item.riqi.split("-")[0] && now.getMonth()+1 === this.item.riqi.split("-")[1] && now.getDate() === this.item.riqi.split("-")[2]){
                if(now >= start && now <= end){
                    console.log(start)
                    this.disable = true
                }
            }
        }else if(this.item.courseindex === 2){
            descTemp += "10:10 ~ 12:00"

            var now = new Date()
            var start = new Date()
            var end = new Date()
            start.setHours(10)
            start.setMinutes(10)
            start.setSeconds(0)
            end.setHours(12)
            end.setMinutes(0)
            end.setSeconds(0)
            if(now.getFullYear() === this.item.riqi.split("-")[0] && now.getMonth()+1 === this.item.riqi.split("-")[1] && now.getDate() === this.item.riqi.split("-")[2]){
                if(now >= start && now <= end){
                    console.log(start)
                    this.disable = true
                }
            }
        }else if(this.item.courseindex === 3){
            descTemp += "14:30 ~ 16:20"

            var now = new Date()
            var start = new Date()
            var end = new Date()
            start.setHours(14)
            start.setMinutes(30)
            start.setSeconds(0)
            end.setHours(16)
            end.setMinutes(20)
            end.setSeconds(0)
            if(now.getFullYear() === this.item.riqi.split("-")[0] && now.getMonth()+1 === this.item.riqi.split("-")[1] && now.getDate() === this.item.riqi.split("-")[2]){
                if(now >= start && now <= end){
                    console.log(start)
                    this.disable = true
                }
            }
        }else if(this.item.courseindex === 4){
            descTemp += "16:40 ~ 18:10"

            var now = new Date()
            var start = new Date()
            var end = new Date()
            start.setHours(16)
            start.setMinutes(40)
            start.setSeconds(0)
            end.setHours(18)
            end.setMinutes(10)
            end.setSeconds(0)
            if(now.getFullYear() === this.item.riqi.split("-")[0] && now.getMonth()+1 === this.item.riqi.split("-")[1] && now.getDate() === this.item.riqi.split("-")[2]){
                if(now >= start && now <= end){
                    console.log(start)
                    this.disable = true
                }
            }
        }else if(this.item.courseindex === 5){
            descTemp += "19:00 ~ 20:00"

            var now = new Date()
            var start = new Date()
            var end = new Date()
            start.setHours(19)
            start.setMinutes(0)
            start.setSeconds(0)
            end.setHours(20)
            end.setMinutes(0)
            end.setSeconds(0)
            console.log(start)
            if(now.getFullYear() === this.item.riqi.split("-")[0] && now.getMonth()+1 === this.item.riqi.split("-")[1] && now.getDate() === this.item.riqi.split("-")[2]){
                if(now >= start && now <= end){
                    console.log(start)
                    this.disable = true
                }
            }
        }else if(this.item.courseindex === 6){
            descTemp += "20:00 ~ 21:00"

            var now = new Date()
            var start = new Date()
            var end = new Date()
            start.setHours(20)
            start.setMinutes(0)
            start.setSeconds(0)
            end.setHours(21)
            end.setMinutes(0)
            end.setSeconds(0)
            if(now.getFullYear() === this.item.riqi.split("-")[0] && now.getMonth()+1 === this.item.riqi.split("-")[1] && now.getDate() === this.item.riqi.split("-")[2]){
                if(now >= start && now <= end){
                    console.log(start)
                    this.disable = true
                }
            }
        }
        
        this.item.desc = descTemp
    },
}
</script>

<style scoped>
    .van-panel{
        margin: 10px 0;
    }

    div.content{
        display: flex;
        
        padding: 10px 10px;
    }

</style>