import { createApp } from "vue";
import { createStore } from "vuex";
import Service from "./api/service";
import App from "./App.vue";
import "./assets/main.scss";

const app = createApp(App);

// store.ts

// define your typings for the store state
export interface State {
  service: Service;
}
export const choices_service: Service = new Service(
  "http://localhost:8000/",
  "choices"
);
export const store = createStore<State>({
  state() {
    return {
      service: choices_service,
    };
  },
});

app.use(store);
app.mount("#app");
