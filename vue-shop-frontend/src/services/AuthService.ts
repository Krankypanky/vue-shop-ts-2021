import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

export default class AuthService {
  public static isLoggedIn = (): boolean => !!Cookies.get('authorization-token')

  public static logout = (): void => {
    Cookies.remove('authorization-token');
  }

  public static getToken = (): string | undefined => Cookies.get('authorization-token')

  public static login = (
    apiUrl: string,
    email: string,
    password: string,
  ): Promise<string> | null => axios
    .post(`${apiUrl}/login`, {
      email,
      password,
    })
    .catch((e: AxiosError) => {
      console.error(e.response);
      throw e;
    })
    .then((resp) => {
      const token = resp?.data?.token ?? null;
      console.log(token);
      Cookies.set('authorization-token', token);
      return token;
    })

  public static register = (
    apiUrl: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    name: string,
  ): Promise<string> | null => axios
    .post(`${apiUrl}/register`, {
      email,
      password,
      password_confirmation: passwordConfirmation,
      name,
    })
    .catch((e: AxiosError) => {
      console.error(e.response);
      throw e;
    })
    .then((resp) => {
      const token = resp?.data?.token ?? null;
      return token;
    });
}
