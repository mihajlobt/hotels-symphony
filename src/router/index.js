import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import HotelInfo from "../views/HotelInfo";
import Favorites from "../views/Favorites";
import Home from "../views/Home";
import HotelForm from "../views/HotelForm";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/hotels",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/hotels/new",
    name: "HotelForm",
    component: HotelForm
  },
  {
    path: "/hotels/:id",
    name: "HotelInfo",
    component: HotelInfo
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
