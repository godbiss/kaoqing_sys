<template>
  <router-view></router-view>

</template>

<script>
export default {
  name: "App",
  computed:{
    getWsMsg (){
        return this.$store.state.webSocketMsg
    }
  },
  watch:{
      getWsMsg:{
          handler: function(newVal) {
              console.log(newVal)
              alert('接收到webSocket推送'+ newVal)
          }
      }
  }

  };

</script>

<style scoped>
</style>
