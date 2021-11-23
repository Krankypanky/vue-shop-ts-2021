import errorFormatter from "@/helpers/error-formatter";
import BookService from "@/services/BookService";
import { Book } from "@/types/book.type";
import { AppStore } from "@/types/store.type";
import { AxiosError } from "axios";
import { createStore } from "vuex";

const defaultState: AppStore = {
  books: [],
  cart: [],

  loading: false,
  errors: [],

  searchTerm: "",
};

export default createStore<AppStore>({
  state: defaultState,
  mutations: {
    addBooksToStore(currentState, books: Book[]) {
      currentState.books = books;
    },

    addBookToCart(currentState, book: Book): void {
      currentState.cart.push(book);
    },

    removeBookFromCart(currentState, index: number) {
      // TODO: nur splicen
      // const clonedCart = [...currentState.cart];
      // clonedCart.splice(index, 1);
      currentState.cart.splice(index, 1);
    },

    setLoading(currentState, newLoadingState: boolean) {
      currentState.loading = newLoadingState;
    },

    setErrors(currentState, newErrorState: string[]) {
      currentState.errors = newErrorState;
    },

    setSearchTerm(currentState, newSearchTerm: string) {
      currentState.searchTerm = newSearchTerm;
    },
  },
  actions: {
    async getBooks({ commit }, { apiUrl }) {
      commit("setLoading", true);
      commit("setErrors", []);
      try {
        const allBooks = await BookService.getBooks(apiUrl);
        commit("addBooksToStore", allBooks);
      } catch (e) {
        commit("setErrors", errorFormatter(e as AxiosError));
      }
      commit("setLoading", false);
    },
  },
  modules: {},
});
