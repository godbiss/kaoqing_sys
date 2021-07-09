<template>
  <div class="container">
    <el-container direction="vertical">
      <el-main>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          size="medium"
          :model="registForm"
          ref="registForm"
          :rules="rules"
        >
          <el-form-item> 注册 </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registForm.email"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registForm.password"
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              v-model="registForm.checkPass"
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type"
            ><el-select v-model="registForm.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registForm')"
              >注册</el-button
            >
            <el-button @click="resetForm('registForm')">重置</el-button>
            <router-link to="/login">前去登录</router-link>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import * as sysTool from "../utils/systemTool";
export default {
  name: "Register",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空"));
      } else if (value.length < 2) {
        callback(new Error("用户名长度不能为1"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registForm.checkPass !== "") {
          this.$refs.registForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      registForm: {
        email: "",
        username: "",
        password: "",
        checkPass: "",
        type: "",
      },
      rules: {
        email: [
         { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        username: [
          { required: true, validator: validateUsername, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择用户类型", trigger: "blur" }],
      },
      options: [
        {
          value: 2,
          label: "学生",
        },
        {
          value: 3,
          label: "老师",
        },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .put("/api/regist", {
              email : this.registForm.email,
              username: this.registForm.username,
              password: this.registForm.password,
              type: this.registForm.type,
            })
            .then((res) => {
              console.log(res);
              if(res.data.success === true){
                this.$toast("注册成功")
                this.$router.push({
                  name: "Login",
                });
              }else if(res.data.msg !== null){
                this.$toast(res.data.msg)
              }
              else{
                this.$toast("注册失败")
              }

            })
            .catch((err) => {
              this.$toast("服务器异常");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    if (!sysTool._isMobile()) {
      this.$store.commit("setErrorMsg", "请使用手机登录!");
      this.$router.push({ name: "ErrorMsg" });
    }
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