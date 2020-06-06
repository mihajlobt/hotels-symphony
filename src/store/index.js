import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { getUrl } from "../../config";

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
      const res = await axios.post(getUrl("api-token-auth"), data);
      const { username, first_name, last_name, user_id, token } = res.data;
      window.$cookies.set("hotelSymphonyToken", token);
      commit("SET_USER", { username, first_name, last_name, user_id });
    },
    async register({ commit }, data) {
      const res = await axios.post(getUrl("register/"), data);
      const { username, first_name, last_name } = res.data;
      commit("SET_USER", { username, first_name, last_name });
    },
    async getHotels({ commit }) {
      const res = await axios.get(getUrl("hotel_api/"), {
        headers: {
          Authorization: `Token ${window.$cookies.get("hotelSymphonyToken")}`
        }
      });
      commit("SET_HOTELS", res.data);
    },
    async getReviews({ commit }, hotelId) {
      const res = await axios.get(
        getUrl(`hotel_api/get_hotel_reviews/${hotelId}`),
        {
          headers: {
            Authorization: `Token ${window.$cookies.get("hotelSymphonyToken")}`
          }
        }
      );
      const reviews = res.data;
      commit("SET_HOTEL_REVIEWS", reviews);
    },
    async getHotelDetails({ commit }, id) {
      const res = await axios.get(getUrl(`hotel_api/${id}`), {
        headers: {
          Authorization: `Token ${window.$cookies.get("hotelSymphonyToken")}`
        }
      });
      commit("SET_HOTEL_INFO", res.data);
    },
    async getFavoriteHotels({ commit }) {
      const res = await axios.get(getUrl("favorites/"), {
        headers: {
          Authorization: `Token ${window.$cookies.get("hotelSymphonyToken")}`
        }
      });
      commit("SET_FAVORITES", res.data);
    },
    async addFavorite({ commit }, hotel) {
      const data = {
        hotel_id: hotel.id,
        is_favorite: true
      };
      await axios.post(getUrl("favorites/add_remove"), data, {
        headers: {
          Authorization: `Token ${window.$cookies.get("hotelSymphonyToken")}`
        }
      });
      commit("ADD_FAVORITE", hotel);
    },
    async removeFavorite({ commit }, hotel) {
      const data = {
        hotel_id: hotel.id,
        is_favorite: false
      };
      await axios.post(getUrl("favorites/add_remove"), data, {
        headers: {
          Authorization: `Token ${window.$cookies.get("hotelSymphonyToken")}`
        }
      });
      commit("REMOVE_FAVORITE", data);
    },
    async createHotel({ commit }, hotel) {
      const data = {
        ...hotel,
        location: "1,2",
        user: [this.state.user.user_id]
      };
      await axios.post(getUrl("hotel_api/"), data, {
        headers: {
          Authorization: `Token ${window.$cookies.get("hotelSymphonyToken")}`
        }
      });
      commit("NEW_HOTEL", data);
    }
  },
  modules: {}
});
