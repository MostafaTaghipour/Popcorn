import { AxiosRequestConfig } from "axios";
import { store } from "@app/store";

/**
 * add token to requests
 *
 * @param {AxiosRequestConfig} request
 * @return {*} 
 */
const requestInterceptor = (request: AxiosRequestConfig) => {
  request.headers = requestHeaders(request.headers);
  return request;
};

const requestHeaders = (def = {}) => {
  var headers = {
    ...def,
  };

  const token = store.getState().auth.token;

  if (token) headers = { ...headers, Authorization: `Bearer ${token}` };

  return headers;
};

export default {
  request: requestInterceptor,
};
