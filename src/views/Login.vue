<template>
  <div class="container login">
    <el-card class="login-box">
      <el-button @click="$router.push('/')" type="text">Back</el-button>
      <el-form :model="auth">
        <el-form-item label="Email">
          <el-input v-model="auth.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="auth.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickLogin()">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      auth: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["login"]),
    async clickLogin() {
      try {
        await this.login(this.auth);
        this.$router.push("/hotels");
      } catch (err) {
        this.$message({
          message: "Invalid login",
          type: "error"
        });
      }
    }
  }
};
</script>
