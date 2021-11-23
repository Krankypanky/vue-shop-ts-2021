import { Store } from "vuex";
import { Config } from "./types/config.type";
import { AppStore } from "./types/store.type";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<AppStore>;
    $config: Config;
  }
}
