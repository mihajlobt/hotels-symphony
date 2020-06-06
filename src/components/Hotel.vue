<template>
  <div class="flex-container">
    <el-card class="hotel-card">
      <el-button
        type="text"
        class="hotel-name"
        @click="getHotelInfo(hotel.id, 'tab')"
        >{{ hotel.name }}</el-button
      >
      <div>Location: {{ hotel.city }}, {{ hotel.country }}</div>
      <el-rate disabled :value="hotel.stars"></el-rate>
      <el-row class="hotel-description">{{ hotel.description }}</el-row>
      <div class="flex-container">
        <div v-if="!disableFav">
          <el-button v-if="isFavorite(hotel)" @click="removeFromFavs(hotel)"
            ><i class="el-icon-star-on"></i
          ></el-button>
          <el-button v-else @click="addToFavs(hotel)"
            ><i class="el-icon-star-off"></i
          ></el-button>
        </div>
        <el-button v-if="!hotelId" @click="getHotelReviews(hotel.id)"
          >Show Reviews</el-button
        >
        <el-button v-else @click="hideReviews">Hide Reviews</el-button>
        <el-button
          v-if="!disableDetails"
          type="primary"
          @click="getHotelInfo(hotel.id)"
          >Details</el-button
        >
      </div>
      <Reviews
        :loaded="loaded"
        v-if="hotelId !== 0 && loaded"
        :reviews="hotelReviews"
      />
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Reviews from "./Reviews";

export default {
  data() {
    return {
      hotelId: 0,
      loaded: false
    };
  },
  components: {
    Reviews
  },
  props: ["hotel", "disableDetails", "disableFav"],
  name: "Hotel",
  computed: {
    hotelReviews() {
      return this.$store.state.reviews;
    },
    hotelInfo() {
      return this.$store.state.hotelInfo;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    ...mapActions([
      "getReviews",
      "getHotelDetails",
      "addFavorite",
      "removeFavorite"
    ]),
    async getHotelReviews(hotelId) {
      await this.getReviews(hotelId);
      this.loaded = true;
      this.hotelId = hotelId;
    },
    async getHotelInfo(id, openType) {
      await this.getHotelDetails(id);
      if (openType === "tab") {
        window.open(`${document.URL}/${id}`, "_target");
      } else {
        window.open(
          `${document.URL}/${id}`,
          "_blank",
          "location=yes,height=600,width=500,scrollbars=yes,status=yes"
        );
      }
    },
    async addToFavs(hotel) {
      await this.addFavorite(hotel);
      this.$emit("updateList");
    },
    async removeFromFavs(hotel) {
      await this.removeFavorite(hotel);
      this.$emit("updateList");
    },
    hideReviews() {
      this.hotelId = 0;
    },
    isFavorite(hotel) {
      for (let i = 0; i < hotel.user.length; i++) {
        if (this.user.user_id === hotel.user[i]) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
