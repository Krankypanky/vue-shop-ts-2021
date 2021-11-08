import { Book } from '@/types/book.type';
import { AppStore } from '@/types/store.type';
import { createStore } from 'vuex';
import BookService from '../services/BookService';
import router from '../router'
import { AxiosError } from 'axios';
import errorFormatter from '@/helpers/error-formatter';

const defaultState: AppStore = {
  books: [],
  cart: [],

  loading: false,
  errors: []
};

export default createStore({
  state: defaultState,
  mutations: {
    // books
    addBooksToStore(state, books: Book[]) {
      state.books = books;
    },

    // cart
    addBookToCart: BookService.addBookToCart,
    removeBookFromCart: BookService.removeBookFromCart,

    // loading
    setLoading(state, newLoadingState: boolean) {
      state.loading = newLoadingState;
    },

    // errors
    setErrors(state, newErrors: string[]) {
      state.errors = newErrors;
    }
  },
  actions: {
    async getBooks({ commit }, { apiUrl }) {
      commit("setLoading", true);
      commit("setErrors", []);
      try {
        const books = await BookService.getBooks(apiUrl);
        commit("addBooksToStore", books);
      } catch (e: unknown) {
        if ((e as AxiosError).code === "401") {
          router.push("/login");
          return
        }
        commit("setErrors", errorFormatter(e as AxiosError));
      }
      commit("setLoading", false);
    }
  }
});
