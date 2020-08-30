import axios, { AxiosInstance, Method } from "axios";
import logger from "./logger";
import headerInterceptor from "./headerInterceptor";
import mocker from "./mocker";
import { provideMockData } from "./mock";
import Configs from "@app/constants/Configs";

/**
 * configuration axios for our use
 *
 */
const webApi: AxiosInstance = axios.create({
  baseURL: Configs.API_URL,
});

webApi.defaults.timeout = 60 * 1000;

webApi.interceptors.request.use(logger.request, logger.error);
webApi.interceptors.request.use(headerInterceptor.request);
webApi.interceptors.request.use(mocker.requestInterceptor, (error) =>
  Promise.reject(error)
);
webApi.interceptors.response.use(
  mocker.responseInterceptor,
  mocker.errorInterceptor
);
webApi.interceptors.response.use(logger.response, logger.error);

provideMockData();
mocker.enableMocking();

export default webApi;
