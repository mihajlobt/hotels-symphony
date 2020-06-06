<template>
  <div>
    <Menu />
    <Hotel
      v-for="fav in favorites"
      :key="fav.id"
      :hotel="fav"
      :disableFav="true"
      disableDetails="true"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Menu from "../views/Menu";
import Hotel from "../components/Hotel";

export default {
  name: "Favorites",
  components: {
    Menu,
    Hotel
  },
  methods: {
    ...mapActions(["getFavoriteHotels"])
  },
  computed: {
    favorites() {
      return this.$store.state.favorites;
    }
  },
  async created() {
    await this.getFavoriteHotels();
  }
};
</script>
