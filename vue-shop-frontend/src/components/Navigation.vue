<template>
  <nav class="relative w-full bg-gray-800 select-none lg:flex lg:items-stretch">
    <div
      class="
        flex
        items-center
        w-full
        h-12
        max-w-xl
        py-3
        m-auto
        text-white
        list-none
        flex-no-shrink
      "
    >
      <div class="flex items-center w-full justify-content-between">
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
        class="
          w-full
          py-1
          pl-3
          leading-tight
          text-gray-700
          border
          rounded
          shadow
          appearance-none
          focus:outline-none focus:shadow-outline
        "
      />
      <cart-modal
        :cart="cart"
        v-on:removeBookFromCart="removeBookFromCart"
      ></cart-modal>
      <button
        class="
          px-4
          py-1
          ml-2
          font-bold
          text-white
          bg-red-500
          rounded
          hover:red-700
        "
        v-if="isLoggedIn"
        v-on:click="logout"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import CartModal from "@/components/CartModal.vue";
import { Book } from "@/types/book.type";

type NavigationState = {
  isLoggedIn: boolean;
  searchTerm: string;
};

export default defineComponent({
  components: { CartModal },
  props: {
    cart: {
      required: true,
      type: Array as PropType<Book[]>,
    },
  },
  data: (): NavigationState => ({
    isLoggedIn: true,
    searchTerm: "",
  }),
  methods: {
    logout() {
      console.log(this);
    },
    searchChanged(evt: Event) {
      const value = (evt?.target as HTMLInputElement).value;
      this.$emit("searchChanged", value);
    },
    removeBookFromCart(index: number) {
      this.$emit("removeBookFromCart", index);
    },
  },
});
</script>
