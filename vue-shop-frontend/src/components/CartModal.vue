<template>
  <div>
    <button
      class="
        relative
        px-4
        py-1
        mx-4
        font-bold
        text-white
        bg-green-500
        rounded
        hover:red-700
      "
      v-on:click="openCart"
    >
      Warenkorb
      <span
        class="
          absolute
          px-1
          text-xs
          bg-blue-400
          border-black
          rounded-full
          -right-2
          -top-2
        "
        >{{ cart?.length ?? 0 }}</span
      >
    </button>
    <div
      class="fixed inset-0 z-10 overflow-y-auto display-none"
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
          px-4
          pt-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="
            relative
            inline-block
            overflow-hidden
            text-left
            align-bottom
            transition-all
            transform
            bg-white
            rounded-sm
            shadow-xl
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
          "
        >
          <button
            class="absolute top-0 p-2 text-black right-2"
            v-on:click="closeCart"
          >
            x
          </button>

          <div class="px-4 pt-5 pb-4 text-black bg-white sm:p-6 sm:pb-4">
            <h3>Warenkorb</h3>
            <hr />
            <p v-if="!cart?.length" class="mt-2">
              Aktuell keine Bücher im Warenkorb
            </p>
            <ul class="h-40 overflow-auto">
              <li
                v-for="(book, index) in cart"
                :key="index + book.isbn"
                class="flex items-center justify-between my-3"
              >
                <p class="">
                  <span class="truncate">{{ book.title }}</span>
                  - <strong>{{ book.price }}€</strong>
                </p>

                <button
                  class="
                    p-1
                    font-bold
                    text-white
                    bg-red-500
                    rounded
                    hover:red-700
                  "
                  v-on:click="removeBookFromCart(index)"
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
import { Book } from "@/types/book.type";
import { defineComponent, PropType } from "vue";

type CartModalState = {
  cartOpen: boolean;
};

export default defineComponent({
  data: (): CartModalState => ({
    cartOpen: false,
  }),
  props: {
    cart: {
      required: true,
      type: Array as PropType<Book[]>,
    },
  },
  computed: {
    total(): number {
      let total = 0;
      this.cart.forEach((cartItem: Book) => (total += cartItem.price));
      return total;
    },
  },
  methods: {
    openCart() {
      this.cartOpen = true;
    },
    closeCart() {
      this.cartOpen = false;
    },
    removeBookFromCart(index: number) {
      this.$emit("removeBookFromCart", index);
    },
  },
});
</script>
