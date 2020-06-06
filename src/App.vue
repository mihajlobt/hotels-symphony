<template>
  <div id="app" class="app">
    <el-spinner v-if="!loaded">loading</el-spinner>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false
    };
  },
  async created() {
    this.checkToken();
    this.loaded = true;
  },
  methods: {
    checkToken() {
      if (!this.$cookies.get("hotelSymphonyToken")) {
        this.$router.push({ name: "Login" });
      }
    }
  },
  watch: {
    $route() {
      this.checkToken();
    }
  }
};
</script>
