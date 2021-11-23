import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

const authCookieKey = "authorization-token";

type LoginParams = {
  email: string;
  password: string;
};

export default class AuthService {
  public static isLoggedIn = (): boolean => !!Cookies.get(authCookieKey);

  public static logout = (): void => {
    Cookies.remove(authCookieKey);
  };

  public static getToken = (): string | null | undefined => {
    return Cookies.get(authCookieKey);
  };

  public static async login(
    apiUrl: string,
    params: LoginParams
  ): Promise<string | null> {
    const apiEndpoint = `${apiUrl}/login`;
    return axios
      .post(apiEndpoint, params)
      .then((resp) => {
        const token = resp?.data?.token ?? null;
        return token;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }
}
