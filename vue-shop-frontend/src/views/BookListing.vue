<template>
  <navigation
    v-on:searchChanged="searchChanged"
    v-on:removeBookFromCart="removeBookFromCart"
    :cart="cart"
  ></navigation>
  <div id="BookListingPage" class="max-w-xl m-auto mt-5">
    <h1 class="mb-3 text-xl">Bücher Liste</h1>
    <loading :loading="loading"></loading>
    <ul class="flex flex-row flex-wrap">
      <li
        v-for="book in books"
        :key="book.id"
        class="flex flex-col w-full p-2 overflow-hidden rounded shadow-lg  md:w-1/3 lg:w-1/4"
      >
        <h2 class="truncate" :title="book.title">{{ book.title }}</h2>
        <div class="flex justify-between">
          <div class="relative">
            <img
              :src="book.image"
              :alt="book.title"
              class="block h-20 rounded-sm"
            />
            <button
              v-on:click="addBookToCart(book)"
              class="absolute px-4 py-1 mt-1 font-bold text-white bg-green-500 rounded  hover:red-700 right-1 bottom-1"
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
import { Book } from "@/types/book.type";
import ErrorRenderer from "@/components/ErrorRenderer.vue";
import Navigation from "@/components/Navigation.vue";
import Loading from "@/components/Loading.vue";
import { defineComponent } from "vue";
import { AppStore } from "@/types/store.type";

const filterBooks = (book: Book, searchTerm: string) => {
  return (
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

type BookListingState = {
  searchTerm: string;
};

export default defineComponent({
  components: {
    ErrorRenderer,
    Navigation,
    Loading,
  },
  data: (): BookListingState => ({
    searchTerm: "",
  }),
  computed: {
    books(): Book[] {
      return this.$store.state.books.filter((book: Book) =>
        filterBooks(book, this.searchTerm)
      );
    },
    loading(): boolean {
      return this.$store.state.loading;
    },
    errors() {
      return this.$store.state.errors;
    },
    cart() {
      return this.$store.state.cart;
    },
  },
  methods: {
    addBookToCart(book: Book): void {
      this.$store.commit("addBookToCart", book);
    },

    // work with the index
    removeBookFromCart(index: number): void {
      // console.log(index);
      // const clonedCart = [...this.cart];
      // clonedCart.splice(index, 1);
      // this.cart = clonedCart;
    },

    async getBooks(): Promise<void> {
      // this.loading = true;
      // this.errors = [];
      // try {
      //   this.allBooks = await BookService.getBooks("http://localhost/api");
      // } catch (e) {
      //   this.errors = errorFormatter(e as AxiosError);
      // }
      // this.loading = false;
    },

    searchChanged(searchTerm: string) {
      // this.searchTerm = searchTerm;
      // console.log(searchTerm);
    },
  },
  async beforeMount() {
    await this.getBooks();
  },
});
</script>
