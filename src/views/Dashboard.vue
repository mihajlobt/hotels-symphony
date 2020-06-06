<template>
  <div class="dashboard">
    <Menu />
    <div v-if="loaded" class="container">
      <div v-for="hotel in hotelsList" :key="hotel.id">
        <Hotel :hotel="hotel" @updateList="loadHotels" />
      </div>
    </div>
    <el-spinner v-else></el-spinner>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Hotel from "../components/Hotel";
import Menu from "../components/Menu";
export default {
  name: "Dashboard",
  data() {
    return {
      loaded: false
    };
  },
  components: {
    Hotel,
    Menu
  },
  computed: {
    hotelsList() {
      return this.$store.state.hotels;
    }
  },
  async created() {
    try {
      await this.getHotels();
    } catch (e) {
      this.$message({ message: "error getting hotels", type: "error" });
    }
    this.loaded = true;
  },
  methods: {
    ...mapActions(["getHotels", "getReviews"]),
    async loadHotels() {
      await this.getHotels();
    }
  }
};
</script>
