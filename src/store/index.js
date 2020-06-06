import Vue from "vue";
import Vuex from "vuex";
import { axiosRequest } from "../utils/axiosRequest";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    hotels: [],
    newHotel: [],
    hotelInfo: {},
    favorites: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_HOTELS(state, hotels) {
      state.hotels = hotels;
    },
    SET_HOTEL_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },
    SET_HOTEL_INFO(state, info) {
      state.hotelInfo = info;
    },
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites;
    },
    REMOVE_FAVORITE(state, favorite) {
      state.favorites.splice(favorite);
    },
    ADD_FAVORITE(state, favorite) {
      state.favorites.push(favorite);
    },
    NEW_HOTEL(state, hotel) {
      state.newHotel.push(hotel);
    }
  },
  actions: {
    async login({ commit }, data) {
      const res = await axiosRequest("POST", "api-token-auth", data);
      const { username, first_name, last_name, user_id, token } = res.data;
      window.$cookies.set("hotelSymphonyToken", token);
      commit("SET_USER", { username, first_name, last_name, user_id });
    },
    async register({ commit }, data) {
      const res = await axiosRequest("POST", "register/", data);
      const { username, first_name, last_name } = res.data;
      commit("SET_USER", { username, first_name, last_name });
    },
    async getHotels({ commit }) {
      const res = await axiosRequest("GET", "hotel_api/");
      commit("SET_HOTELS", res.data);
    },
    async getReviews({ commit }, hotelId) {
      const res = await axiosRequest(
        "GET",
        `hotel_api/get_hotel_reviews/${hotelId}`
      );
      const reviews = res.data;
      commit("SET_HOTEL_REVIEWS", reviews);
    },
    async getHotelDetails({ commit }, id) {
      const res = await axiosRequest("GET", `hotel_api/${id}`);
      commit("SET_HOTEL_INFO", res.data);
    },
    async getFavoriteHotels({ commit }) {
      const res = await axiosRequest("GET", "favorites/");
      commit("SET_FAVORITES", res.data);
    },
    async addFavorite({ commit }, hotel) {
      const data = {
        hotel_id: hotel.id,
        is_favorite: true
      };
      await axiosRequest("POST", "favorites/add_remove", data);
      commit("ADD_FAVORITE", hotel);
    },
    async removeFavorite({ commit }, hotel) {
      const data = {
        hotel_id: hotel.id,
        is_favorite: false
      };
      await axiosRequest("POST", "favorites/add_remove", data);
      commit("REMOVE_FAVORITE", data);
    },
    async createHotel({ commit }, hotel) {
      const data = {
        ...hotel,
        location: "1,2",
        user: [this.state.user.user_id]
      };
      await axiosRequest("POST", "hotel_api/", data);
      commit("NEW_HOTEL", data);
    }
  },
  modules: {}
});
