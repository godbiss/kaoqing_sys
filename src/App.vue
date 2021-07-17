<template>
  <router-view></router-view>

</template>

<script>
export default {
  name: "App",
  created(){
    // this.initWebSocket()
  },
//   methods: {
//     initWebSocket() {
// 	      //判断当前浏览器是否支持WebSocket
// 	      if ("WebSocket" in window) {
// 	        //初始化weosocket(必须)
// 	        this.$store.state.webSocket = new WebSocket(
// 	          "ws://localhost:80/kaoqin_sys/websocket/" + this.$store.state.user.id + "/" + this.$store.state.user.username
// 	        ); //新建一个webstock对象        
// 	        this.$store.state.webSocket.onopen = this.websocketonopen;
// 	        this.$store.state.webSocket.onmessage = this.websocketonmessage;
// 	        this.$store.state.webSocket.onerror = this.websocketonerror;
// 	        this.$store.state.webSocket.onclose = this.websocketclose;
// 	      } else {
// 	        alert("当前浏览器 Not support websocket");
// 	      }
// 	    },
// 	    websocketonopen() {
// 	      console.log("---连接建立成功---");
// 	      //websocket连接后发送数据(send发送)
// 	      // let actions = { 你要发送给后台的参数 }; //请根据实际项目需要进行修改
// 	      // this.websocketsend(JSON.stringify(actions));
// 	    },
// 	    websocketonerror() {
// 	      //连接建立失败重连
// 	      this.initWebSocket();
// 	    },
// 	    websocketonmessage(e) {
// 	      //数据接收
// 	      this.$store.commit('SET_WS_MSG', e.data) 
// 	      console.log("-----redata-----")
// 	      console.log(e);
// 	    },
// 	    websocketsend(Data) {
// 	      //数据发送
// 	      this.$store.state.webSocket.send(Data);
// 	    },
// 	    websocketclose(e) {
// 	      //关闭
// 	      console.log("断开连接", e);
// 	    }
//   },
//   computed:{
//     getWsMsg (){
//         return this.$store.state.webSocketMsg
//     }
//   },
//   watch:{
//       getWsMsg:{
//           handler: function(newVal) {
//               console.log(newVal)
//               alert('接收到webSocket推送'+ newVal)
//           }
//       }
//   }

  };

</script>

<style scoped>
</style>
