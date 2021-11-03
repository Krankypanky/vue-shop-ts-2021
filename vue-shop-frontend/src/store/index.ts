import { createStore } from 'vuex';
import BookService from '../services/BookService';

export default createStore({
  state: {
    cart: [],
  },
  mutations: {
    addBookToCart: BookService.addBookToCart,
    removeBookFromCart: BookService.removeBookFromCart,
  },
});
