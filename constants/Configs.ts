import { API_URL, ENVIRONMENT } from "@app/env.json";

// Our configs can be overridden in different environments (staging , development, production)
export default {
  IS_DEBUG: __DEV__,
  ENVIRONMENT,
  API_URL,
  PAGINATION_FIRST_PAGE_NUMBER: 0,
  PAGINATION_PAGE_SIZE: 50,
  PAGINATION_DEFAULT_TOTAL: 100,
};
