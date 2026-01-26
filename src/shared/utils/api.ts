// ** Lib & file
import axios from "axios";

const isServer = typeof window === 'undefined';
const API_URL = isServer ? 'http://localhost:3000' : '';

const defaultOptions = {
  withCredentials: true, // Necessary if we call cross-origin, good practice for cookies
};

function getApi(path: string, options: any = {}) {
  return axios.get(`${API_URL}/${path.replace(/^\//, "")}`, {
    ...defaultOptions,
    ...options,
  });
}

function postApi(path: string, data?: any, options: any = {}) {
  return axios.post(`${API_URL}/${path.replace(/^\//, "")}`, data, {
    ...defaultOptions,
    ...options,
  });
}

function putApi(path: string, data: any, options: any = {}) {
  return axios.put(`${API_URL}/${path.replace(/^\//, "")}`, data, {
    ...defaultOptions,
    ...options,
  });
}

function deleteApi(path: string, options: any = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, "")}`, {
    ...defaultOptions,
    ...options,
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
