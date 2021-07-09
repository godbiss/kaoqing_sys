<template>
  <div class="container">
    <el-container direction="vertical">
      <el-main>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          size="medium"
          :model="loginForm"
          ref="loginForm"
          :rules="rules"
          hide-required-asterisk
        >
          <el-form-item> 登录 </el-form-item>
          <el-form-item label="账号" prop="email">
            <el-input v-model="loginForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <router-link to="/register">点我立刻注册</router-link>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import * as cookieTool from '../utils/cookieTool'
export default {
  name: "Login",
  data() {
    return {
      labelPosition: "right",
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/api/login", {
          email: this.loginForm.email,
          password: this.loginForm.password,
        })
        .then((res) => {
          if (res.status == 200 && res.data.success) {
            console.log(res.data);
            this.$store.commit('$_setToken', res.data.token);
            this.$store.commit('$_setUser', res.data.user);
            this.$toast("登录成功")
            this.$router.push({ name:'StdHomePage' })  // 跳转到首页
          } else {
            this.$toast("登录失败");
          }
        })
        .catch((err) => {
          this.$toast("服务器异常");
        });
    },
  },
  created() {
  },
};
</script>

<style scoped>
.container {
  background-image: url("../assets/login_bg.jpeg");
  background-size: cover;
  background-position: center;

  height: 100vh;

  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
}

.el-container {
  height: 100%;
}

.el-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 0) and (max-width: 768px) {
  .el-form {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  .el-form-item {
    padding-right: 15px;
  }
}
</style>