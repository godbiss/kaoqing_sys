<template>
  <el-footer class="footer">
    <div
      v-for="(item, index) of items"
      :class="[item.cls, { on: index === idx }]"
      @click="$router.push(item.push)"
      :key="index"
    >
      <i :class="index === idx ? item.iconSelect : item.icon"></i>
      <p :class="['colorChange', { on: index === idx }]">{{ item.name }}</p>
    </div>
  </el-footer>
</template>
 
<script type="text/javascript">
export default {
  props: ["idx"],
  data() {
    return {
      items: [
        {
          cls: "home",
          name: "首页",
          push: "/stdHome/stdHomePage",
          icon: "el-icon-house",
          iconSelect: "el-icon-house",
        },
        {
          cls: "shares",
          name: "签到",
          push: "/stdHome/qiandao",
          icon: "el-icon-bank-card",
          iconSelect: "el-icon-bank-card",
        },
        {
          cla: "community",
          name: "课程",
          push: "/stdHome/courseTable",
          icon: "el-icon-date",
          iconSelect: "el-icon-date",
        },
        {
          cla: "mine",
          name: "我的",
          push: "/stdHome/mine",
          icon: "el-icon-user",
          iconSelect: "el-icon-user",
        },
      ],
    };
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1000;
  box-sizing: border-box;
  height: 10vh;
  width: 100%;
} 
div {
  flex: 1;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
div i {
  transform: scale(2);
}
div p {
  color: #909399;
  margin-bottom:0;
}
.on {
  color: #409eff;
}
</style>