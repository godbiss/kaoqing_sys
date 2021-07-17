<template>
  <div class="Qcontainer">
    <OSHeader title="请假"></OSHeader>
    <div class="title">
        请假
    </div>
    <van-cell-group>
        <van-cell title="开始时间" :value="start" @click="handleClickStart" />
        <van-cell title="结束时间" :value="end" @click="handleClickStart2" />
        <van-field v-model="teacher" placeholder="请输入教师名" label="教师名" />
        <!-- 输入任意文本 -->
        <van-field 
        v-model="text" 
        label="请假理由"
          rows="3"
        autosize
        type="textarea"
        placeholder="请输入请假理由" />
    </van-cell-group>

        <van-button type="info" style="margin:18px" @click="onSubmit">提交</van-button>

    <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '50%' }"
    >
    <van-datetime-picker
    v-model="currentDate"
    type="datetime"
    :min-date="minDate"
    :max-date="maxDate"
    :formatter="formatter"
    @confirm="onConfirm"
    @cancel="onCancel"
    /></van-popup>

    <van-popup
    v-model="show2"
    position="bottom"
    :style="{ height: '50%' }"
    >
    <van-datetime-picker
    v-model="currentDate"
    type="datetime"
    :min-date="minDate"
    :max-date="maxDate"
    :formatter="formatter"
    @confirm="onConfirm2"
    @cancel="onCancel2"
    /></van-popup>
  </div>
</template>

<script>
import OSHeader from "../components/OSHeader.vue";
export default {
  name: "Qingjia",
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,
      show2: false,
      start: null,
      startDate: null,
      endDate: null,
      end: null,
      text: null,
      teacher: null
    };
  },
  components: {
    OSHeader,
  },
  methods: {
      handleClickStart(){
          this.show = true
        console.log(this.start)
      },
        handleClickStart2(){
          this.show2 = true
        console.log(this.end)
      },
      onConfirm(val){
          console.log(val)
          
          this.start = val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate() + " " + val.getHours() + ":" + val.getMinutes() + ":" + val.getSeconds()
          this.startDate = val

          this.show = false
      },
    onCancel(){
          console.log("cancel")

          this.show = false
      },
        onConfirm2(val){
          console.log(val)
          
          this.endDate = val
          this.end = val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate() + " " + val.getHours() + ":" + val.getMinutes() + ":" + val.getSeconds()

          this.show2 = false
      },
    onCancel2(){
          console.log("cancel")

          this.show2 = false
      },
      onSubmit(){
          this.$axios.put('/api/qingjiadan/std/add', {
              banjinum: this.$store.state.user.banjinum,
              codenum: this.$store.state.user.codenum,
              qjtime1: this.start,
              qjtime2: this.end,
              qingjiacontent: this.text,
              username: this.teacher
          }).then(res => {
              console.log(res)
              if(res.data.success === true){
                  this.$toast("申请成功")
                  this.$router.push({name:"Mine"})
              }else{
                  this.$toast("申请失败")
              }
          }).catch(err => {
              console.log(err)
              this.$toast("服务器错误")
          })
      },
      formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`
      }else if (type === 'day') {
        return `${val}日`
      }else if (type === 'hour') {
        return `${val}时`
      }else if (type === 'minute') {
        return `${val}分`
      }
      return val;
    }
  },
};
</script>

<style scoped>
    .content {
    padding: 16px 16px 160px;
    }
    div.Qcontainer{
        background-color: #f7f8fa;
        height: 100vh;
    }
    div.title{
        margin: 10px 18px;
    }
    
</style>