import { createApp } from "vue";
import { createStore } from "vuex";
import Service from "./api/service";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import "./assets/main.scss";
import LoginView from "./views/LoginView.vue";
import ChoiceListView from "./views/ChoiceListView.vue";

const app = createApp(App);

// store.ts

// define your typings for the store state
export interface State {
  service: Service;
  token: string | null;
}
export const choices_service: Service = new Service(
  "http://localhost:8000",
  "choices"
);
export const store = createStore<State>({
  state() {
    return {
      service: choices_service,
      token: null,
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
});

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "root",
    component: ChoiceListView,
  },
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});
app.use(store);
app.use(router);
app.mount("#app");
