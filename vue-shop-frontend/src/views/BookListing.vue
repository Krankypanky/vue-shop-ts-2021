<template>
  <div id="BookListingPage" class="max-w-xl m-auto mt-5">
    <h1 class="mb-3 text-xl">Bücher Liste</h1>

    <ul class="flex flex-row flex-wrap">
      <li
        v-for="book in books"
        :key="book.id"
        class="
          flex flex-col
          w-full
          p-2
          overflow-hidden
          rounded
          shadow-lg
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
              class="block h-20 rounded-sm"
            />
            <button
              v-on:click="addBookToCart(book)"
              class="
                absolute
                px-4
                py-1
                mt-1
                font-bold
                text-white
                bg-green-500
                rounded
                hover:red-700
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
import { defineComponent } from "vue";

const filterBooks = (book: Book, searchTerm: string) => {
  return (
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default defineComponent({
  components: {
    ErrorRenderer,
  },
  computed: {
    books(): Book[] {
      const { searchTerm, books } = this.$store.state;
      return books.filter((book: Book) => filterBooks(book, searchTerm));
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
    // ...mapState(["loading", "errors", "cart"])
  },
  methods: {
    addBookToCart(book: Book): void {
      this.$store.commit("addBookToCart", book);
    },
    removeBookFromCart(index: number): void {
      this.$store.commit("removeBookFromCart", index);
    },
  },
  async beforeMount() {
    await this.$store.dispatch("getBooks", { apiUrl: this.$config.apiUrl });
  },
});
</script>
