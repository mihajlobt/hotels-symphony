import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueCookies from "vue-cookies";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import "../style/main.scss";

Vue.use(VueCookies);
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

VueCookies.config("7d");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
