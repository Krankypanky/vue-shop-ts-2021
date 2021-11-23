import { Book } from "./book.type";

export interface AppStore {
  books: Book[];
  cart: Book[];

  loading: boolean;
  errors: string[];

  searchTerm: string;
}
