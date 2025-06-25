// ** Lib & file
import axios, { CancelToken } from "axios";
// import { API_URL } from "@/config/setting";

// import { ErrCallbackType } from 'src/context/types';
import { CookiesStorage } from "./cookie";

const defaultOptions = {};

// **  Embeded Token into Authorization field in HTTP's header

export const generateToken = () => ({
  Authorization: `Bearer ${CookiesStorage.getAccessToken()}`,
});

const API_URL = "http://localhost:5050/api";

function getApi(path: string, options: any = {}) {
  return axios.get(`${API_URL}/${path.replace(/ ^\//, "")}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
    cancelToken: options.cancelToken,
  });
}

function postApi(path: string, data?: any, options: any = {}) {
  return axios.post(`${API_URL}/${path.replace(/^\//, "")}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function putApi(path: string, data: any, options: any = {}) {
  return axios.put(`${API_URL}/${path.replace(/^\//, "")}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function deleteApi(path: string, options: any = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, "")}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  CancelToken: axios.CancelToken,
};

export default Api;
