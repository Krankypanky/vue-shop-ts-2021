import { Book } from './book.type';

export type AppStore = {
    cart: Book[],
    books: Book[],

    loading: boolean,
    errors: string[]
};
