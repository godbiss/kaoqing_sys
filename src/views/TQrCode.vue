<template>
    <div>
        <vue-qr :logo-src="logoSrc"
          :size="191"
          :margin="0"
          :auto-color="true"
          :dot-scale="1"
          :text="appSrc" />
    </div>
</template>

<script>

import VueQr from 'vue-qr';
export default {
    name:"TQrCode",
    data(){
        return {
            logoSrc:"",
            appSrc:"http://www.baidu.com"
        }
    },
    components: {
        VueQr,
    },
}
</script>

<style scoped>

</style>