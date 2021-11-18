import { Store } from "vuex";
import { AppStore } from "./types/store.type";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<AppStore>;
  }
}
