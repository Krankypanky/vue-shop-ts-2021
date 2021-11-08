<template>
  <div id="BookListingPage" class="max-w-xl m-auto">
    <h1 class="text-xl">Bücher Liste</h1>
    <loading :loading="loading"></loading>
    <ul class="flex flex-row flex-wrap">
      <li
        v-for="book in books"
        :key="book.id"
        class="
          flex flex-col
          rounded
          overflow-hidden
          shadow-lg
          p-2
          w-full
          md:w-1/3
          lg:w-1/4
        "
      >
        <h2 class="truncate">{{ book.title }}</h2>
        <div class="flex justify-between">
          <div class="relative">
            <img
              :src="book.image"
              :alt="book.title"
              class="h-20 rounded-sm block"
            />
            <button
              @click="addBookToCart(book)"
              class="
                bg-green-500
                hover:red-700
                text-white
                font-bold
                py-1
                px-4
                rounded
                mt-1
                absolute
                right-1
                bottom-1
              "
            >
              Add
            </button>
          </div>
        </div>
      </li>
    </ul>
    <error-renderer :errors="errors"></error-renderer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loading from "@/components/Loading.vue";
import ErrorRenderer from "@/components/ErrorRenderer.vue";
import { Book } from "../types/book.type";

const BookListing = defineComponent({
  components: { Loading, ErrorRenderer },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    errors() {
      return this.$store.state.errors;
    },
    books() {
      return this.$store.state.books;
    },
  },
  // on mount -> fetch books
  async mounted(): Promise<void> {
    this.$store.dispatch('getBooks', { apiUrl: this.$config.apiUrl });
  },
  methods: {
    addBookToCart(book: Book): void {
      this.$store.commit("addBookToCart", book);
    },
  },
});
export default BookListing;
</script>
