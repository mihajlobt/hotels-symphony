<template>
  <div>
    <el-menu
      background-color="#545c64"
      mode="horizontal"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="/hotels">Dashboard</el-menu-item>
      <el-menu-item index="/favorites">Favorites</el-menu-item>
      <el-menu-item index="logout">Logout</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      activeIndex: "/hotels"
    };
  },
  methods: {
    handleSelect(route) {
      this.activeIndex = route;
      if (route === "logout") {
        this.$cookies.remove("hotelSymphonyToken");
        this.$router.push("/login");
      } else {
        this.$router.push(route);
      }
    }
  }
};
</script>
