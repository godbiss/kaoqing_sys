<template>
  <div class="Qcontainer">
        <OSHeader title="二维码扫描"></OSHeader>
        <p class="error">{{ error }}</p><!--错误信息-->

        <p class="decode-result">扫描结果: <b>{{ result }}</b></p><!--扫描结果-->

        <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script>
import OSHeader from "../components/OSHeader.vue";
//引入
    import { QrcodeStream } from 'vue-qrcode-reader';
//JS部分
export default{
    components:{
        OSHeader,
        QrcodeStream 
    },
    data (){
        return {
             result: '',//扫码结果信息
                error: '',//错误信息
        }
    },
    methods:{
             onDecode (result) {
                alert(result);
                this.result = result

                console.log(result)

                if(result !== null && result !== ""){
                    this.$axios.post("/api/kaoqinlog/student/update",{
                        id: this.$route.params.id,
                        codenum: this.$store.state.user.codenum,
                        kechengname: this.result,
                        isKuangke: 0,
                        kuangkenum: this.$route.params.kuangkenum,
                        qiandaotype: this.$route.params.qiandaotype,
                    }).then(res => {
                        if(res.data.success === true){
                        this.$toast('签到成功')
                        this.$router.push({name: "QiandaoPanel"})
                        }else{
                            this.$toast('签到失败')
                        }

                    }).catch(err => {
                        this.$toast(err)
                    })
                }

            },

            
            async onInit (promise) {
                try {
                    await promise
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                        this.error = "ERROR: 您需要授予相机访问权限"
                    } else if (error.name === 'NotFoundError') {
                        this.error = "ERROR: 这个设备上没有摄像头"
                    } else if (error.name === 'NotSupportedError') {
                        this.error = "ERROR: 所需的安全上下文(HTTPS、本地主机)"
                    } else if (error.name === 'NotReadableError') {
                        this.error = "ERROR: 相机被占用"
                    } else if (error.name === 'OverconstrainedError') {
                        this.error = "ERROR: 安装摄像头不合适"
                    } else if (error.name === 'StreamApiNotSupportedError') {
                        this.error = "ERROR: 此浏览器不支持流API"
                    }
                }
            }
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
.error {
        font-weight: bold;
        color: red;
    }
</style>