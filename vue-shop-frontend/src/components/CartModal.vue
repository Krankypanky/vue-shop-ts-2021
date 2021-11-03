<template>
  <div>
    <button
      class="
        bg-green-500
        hover:red-700
        text-white
        font-bold
        py-1
        px-4
        rounded
        mx-4
        relative
      "
      v-if="isLoggedIn"
      @click="openCart"
    >
      Warenkorb
      <span
        class="
          px-1
          text-xs
          absolute
          bg-blue-400
          border-black
          rounded-full
          -right-2
          -top-2
        "
        >{{ cart.length }}</span
      >
    </button>
    <div
      class="fixed z-10 inset-0 overflow-y-auto display-none"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-if="cartOpen"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="
            inline-block
            align-bottom
            bg-white
            rounded-sm
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
            relative
          "
        >
          <button
            class="absolute right-2 top-0 text-black p-2"
            @click="closeCart"
          >
            x
          </button>

          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-black">
            <h3>Warenkorb</h3>
            <hr />
            <p v-if="!cart.length" class="mt-2">
              Aktuell keine Bücher im Warenkorb
            </p>
            <ul class="h-40 overflow-auto">
              <li
                v-for="(book, index) in cart"
                :key="index + book.isbn"
                class="flex justify-between my-3 items-center"
              >
                <p class="">
                  <span class="truncate">{{ book.title }}</span>
                  - <strong>{{ book.price }}€</strong>
                </p>

                <button
                  class="
                    bg-red-500
                    hover:red-700
                    text-white
                    font-bold
                    p-1
                    rounded
                  "
                  @click="removeBookFromCart(index)"
                >
                  x
                </button>
              </li>
            </ul>
            <hr />
            <span>
              <strong>Totaler Preis: {{ total }} €</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import { AppStore } from "@/types/store.type";
import store from "../store";

type CartModalState = {
  cartOpen: boolean;
};

export default defineComponent({
  data: (): CartModalState => ({
    cartOpen: false,
  }),
  props: {
    isLoggedIn: Boolean,
  },
  computed: {
    total(): number {
      let total = 0;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price;
      }
      return total;
    },
    ...mapState({
      cart: (state) => (state as AppStore).cart,
    }),
  },
  methods: {
    openCart(): void {
      this.cartOpen = true;
    },
    closeCart(): void {
      this.cartOpen = false;
    },
    removeBookFromCart(index: number): void {
      this.$store.commit("removeBookFromCart", index);
    },
  },
});
</script>
