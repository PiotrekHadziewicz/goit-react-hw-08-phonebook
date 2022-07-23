import axios from "axios";
import { JWT_TOKEN_STORAGE_KEY } from "./constants";

export const contactsApi = axios.create({
    baseURL: 'https://62d6a96b49c87ff2af29af71.mockapi.io/',
});
export const userApi = axios.create({
    baseURL: 'https://connections-api.herokuapp.com/',
});

userApi.interceptors.request.use(function (config) {
  const authToken = localStorage.getItem(JWT_TOKEN_STORAGE_KEY);

  if (authToken) {
    return {
      ...config,
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    };
  }

  return config;
});