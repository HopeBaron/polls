import { Store } from "vuex";
import Service from "./api/service";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    service: Service;
    token: string | null;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
