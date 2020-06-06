<template>
  <div>
    <div v-if="!user">
      <el-button @click="$router.push('/login')">Login</el-button>
      <el-button @click="$router.push('/register')">Register</el-button>
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
