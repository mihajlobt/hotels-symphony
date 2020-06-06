<template>
  <div class="container register">
    <el-card class="register-box">
      <el-form :model="user">
        <el-form-item label="Username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="First Name">
          <el-input v-model="user.first_name"></el-input>
        </el-form-item>
        <el-form-item label="Last Name">
          <el-input v-model="user.last_name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="user.email" type="email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickRegister()"
            >Register</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: ""
      }
    };
  },
  methods: {
    ...mapActions(["register"]),
    async clickRegister() {
      try {
        await this.register(this.user);
        this.$router.push("/login");
      } catch (e) {
        this.$message({ message: "Invalid Data", type: "error" });
      }
    }
  }
};
</script>
