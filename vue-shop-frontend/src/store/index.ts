import { Book } from "@/types/book.type";
import { AppStore } from "@/types/store.type";
import { createStore, Store } from "vuex";

const defaultState: AppStore = {
  books: [],
  cart: [],

  loading: false,
  errors: [],
};

export default createStore<AppStore>({
  state: defaultState,
  mutations: {
    addBooksToStore(currentState, books: Book[]) {
      currentState.books = books;
    },

    addBookToCart(currentState, book: Book): void {
      currentState.books.push(book);
    },
  },
  actions: {},
  modules: {},
});
