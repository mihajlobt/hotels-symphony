<template>
  <div>
    <el-row class="hotel-name">{{ info.name }}</el-row>
    <el-row>City: {{ info.city }}</el-row>
    <el-row>Country: {{ info.country }}</el-row>
    <el-row>About: {{ info.description }}</el-row>
    <el-row>Price: {{ info.price }}</el-row>
    <el-row>Likes: {{ info.likes }}</el-row>
    <el-row>Dislikes: {{ info.dislikes }}</el-row>
    <el-rate disabled :value="info.stars"></el-rate>
    <img :src="info.image" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HotelInfo",
  methods: {
    ...mapActions(["getHotelDetails"])
  },
  async created() {
    await this.getHotelDetails(this.hotelId);
  },
  computed: {
    hotelId() {
      return this.$route.params.id;
    },
    info() {
      return this.$store.state.hotelInfo;
    }
  }
};
</script>
