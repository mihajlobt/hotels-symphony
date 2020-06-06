<template>
  <div class="container hotel-form">
    <Menu />
    <el-card class="register-box">
      <el-form :model="hotel">
        <el-form-item label="Country">
          <el-input v-model="hotel.country"></el-input>
        </el-form-item>
        <el-form-item label="City">
          <el-input v-model="hotel.city"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="hotel.name"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="hotel.description"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model="hotel.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createNewHotel()">Create</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Menu from "./Menu";

export default {
  name: "HotelForm",
  components: {
    Menu
  },
  data() {
    return {
      hotel: {
        stars: 0,
        city: "",
        country: "",
        location: "",
        name: "",
        description: "",
        price: 0,
        user: []
      }
    };
  },
  methods: {
    ...mapActions(["createHotel"]),
    async createNewHotel() {
      try {
        await this.createHotel(this.hotel);
      } catch (e) {
        this.$message({ message: e, type: "error" });
      }

      this.$router.push("/hotels");
    }
  }
};
</script>

<style scoped></style>
