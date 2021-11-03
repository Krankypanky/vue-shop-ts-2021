import axios, { AxiosError } from 'axios';
import { Book } from '../types/book.type';
import { AppStore } from '../types/store.type';
import AuthService from './AuthService';

export default class BookService {
    public static getBooks = async (
        apiUrl: string,
    ): Promise<Book[]> => {
        const token = AuthService.getToken();
        return axios.get(`${apiUrl}/books`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .catch((e: AxiosError) => {
                console.error(e.toJSON());
                throw e;
            })
            .then((resp) => {
                if (resp?.data) {
                    return resp.data as Book[];
                }
                return [];
            });
    }

    public static addBookToCart = (currentState: AppStore, newItem: Book): void => {
        console.log('Book added');
        currentState.cart.push(newItem);
    }

    public static removeBookFromCart = (currentState: AppStore, index: number): void => {
        currentState.cart.splice(index, 1);
    }
}
