<template>
  <nav class="relative select-none lg:flex lg:items-stretch w-full bg-gray-800">
    <div
      class="
        flex flex-no-shrink
        h-12
        list-none
        text-white
        py-3
        max-w-xl
        m-auto
        w-full
        items-center
      "
    >
      <div class="flex justify-content-between w-full items-center">
        <router-link
          to="/"
          v-if="isLoggedIn"
          v-slot="{ href, navigate, isActive, isExactActive }"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
          >
            <a :href="href" class="pr-5" @click="navigate">Home</a>
          </li>
        </router-link>
        <router-link
          to="/login"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="!isLoggedIn"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
          >
            <a :href="href" class="pr-5" @click="navigate">Login</a>
          </li>
        </router-link>
        <router-link
          to="/register"
          v-slot="{ href, navigate, isActive, isExactActive }"
          v-if="!isLoggedIn"
        >
          <li
            :class="[
              isActive && 'router-link-active',
              isExactActive && 'router-link-exact-active',
            ]"
          >
            <a :href="href" class="pr-5" @click="navigate">Register</a>
          </li>
        </router-link>
      </div>
      <input
        type="text"
        v-on:input="searchChanged"
        v-model="searchTerm"
        class="
          shadow
          appearance-none
          border
          rounded
          w-full
          py-1
          pl-3
          text-gray-700
          leading-tight
          focus:outline-none focus:shadow-outline
        "
      />
      <cart-modal :is-logged-in="isLoggedIn"></cart-modal>
      <button
        class="
          bg-red-500
          hover:red-700
          text-white
          font-bold
          py-1
          px-4
          rounded
          ml-2
        "
        v-if="isLoggedIn"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CartModal from "@/components/CartModal.vue";
import AuthService from "@/services/AuthService";

type NavigationState = {
  isLoggedIn: boolean;
  searchTerm: string;
};

export default defineComponent({
  components: { CartModal },
  data: (): NavigationState => ({
    isLoggedIn: AuthService.isLoggedIn(),
    searchTerm: "",
  }),
  methods: {
    logout(): void {
      AuthService.logout();
      this.$router.push("/login");
    },
    setupData(): void {
      this.isLoggedIn = AuthService.isLoggedIn();
    },
    searchChanged(evt: Event) {
      console.log("triggered");
      const value = (evt?.target as HTMLInputElement).value ?? "";
      this.$emit("searchChanged", value);
    },
  },
  watch: {
    $route(): void {
      this.setupData();
    },
  },
});
</script>
