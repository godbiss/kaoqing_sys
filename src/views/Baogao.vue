<template>
  <div class="Qcontainer">
    <OSHeader title="课程报告"></OSHeader>
    <div class="title">
        周课程报告查询
    </div>
    <!-- 输入任意文本 -->
    <van-field v-model="text" label="课程名" />
    <van-button type="info" style="margin:18px" @click="onSubmit">提交</van-button>
  </div>
</template>

<script>
import OSHeader from "../components/OSHeader.vue";
export default {
    name: "Baogao",
    data() {
        return{
            text: ""
        }
    },
    methods:{
        onSubmit(){
            this.$axios.get("/api/kaoqinlog/student/baogao/" + this.$store.state.user.codenum + "/" + this.text)
            .then(res => {
                console.log(res)

                var chuqingnum = 0;
                var kuangkenum = 0;
                var kechengnum = res.data.length;

                res.data.forEach(element => {
                    if(element.iskuangke === 0){
                        chuqingnum += 1
                    }else if(element.iskuangke === 1){
                        kuangkenum += 1
                    }
                });

                this.$dialog.alert({
                    title: '周报告',
                    message: "出勤数: " + chuqingnum + "<br>旷课数: " + kuangkenum + "<br>总课数: " + kechengnum
                    }).then(() => {
                    // on close
                });
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    components: {
        OSHeader,
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