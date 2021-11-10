<template>
  <!-- <navigation v-on:searchChanged="searchChanged"></navigation> -->
  <div id="BookListingPage" class="max-w-xl m-auto mt-5">
    <h1 class="text-xl mb-3">Bücher Liste</h1>
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
        <h2 class="truncate" :title="book.title">{{ book.title }}</h2>
        <div class="flex justify-between">
          <div class="relative">
            <img
              :src="book.image"
              :alt="book.title"
              class="h-20 rounded-sm block"
            />
            <button
              v-on:click="addBookToCart(book)"
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
    <error-renderer></error-renderer>
  </div>
</template>

<script lang="ts">
import { Book } from "@/types/book.type";
import ErrorRenderer from "@/components/ErrorRenderer.vue";
import BookService from "@/services/BookService";
import errorFormatter from "@/helpers/error-formatter";
import { defineComponent } from "vue";
import { AxiosError } from "axios";

type BookListingState = {
  errors: string[];
  loading: boolean;
  books: Book[];
};

const BookListing = defineComponent({
  components: {
    ErrorRenderer,
  },
  data: (): BookListingState => ({
    loading: false,
    errors: [],

    books: [],
  }),
  methods: {
    addBookToCart(book: Book): void {
      console.log(book);
    },

    async getBooks(): Promise<void> {
      this.loading = true;
      this.errors = [];
      try {
        this.books = await BookService.getBooks("http://localhost/api");
      } catch (e) {
        this.errors = errorFormatter(e as AxiosError);
      }
      this.loading = false;
    },
  },
  async beforeMount() {
    await this.getBooks();
  },
});

export default BookListing;
</script>
