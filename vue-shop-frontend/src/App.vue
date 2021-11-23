<template>
  <navigation></navigation>
  <loading></loading>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import Navigation from "@/components/Navigation.vue";
import Loading from "@/components/Loading.vue";

export default defineComponent({
  components: {
    Navigation,
    Loading,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
