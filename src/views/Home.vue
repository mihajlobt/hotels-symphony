<template>
  <div>
    <div v-if="!user" class="home-box">
      <el-row class="bold-heading-title">Hotel Api Test</el-row>
      <el-button type="primary" @click="$router.push('/login')"
        >Login</el-button
      >
      <el-button type="primary" @click="$router.push('/register')"
        >Register</el-button
      >
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped></style>
