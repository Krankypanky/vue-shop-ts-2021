import { Book } from "@/types/book.type";
import axios, { AxiosError } from "axios";

// http://localhost/api

export default class BookService {
    public static getBooks = async (apiUrl: string): Promise<Book[]> => {
        const apiEndpoint = `${apiUrl}/books`;
        return axios.get(apiEndpoint)
            .catch((e: AxiosError) => {
                console.error(e);
                throw e;
            })
            .then((resp) => {
                return resp.data as Book[];
            })
    }

}