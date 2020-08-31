import { ListResult } from "./../store/movie/types";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mocker from "./mocker";
import { mockCategories, mockMovies } from "@app/data/mock/movie";
import { mockAuthResponse } from "@app/data/mock/auth";

/**
 * we can define our mock data for each request
 *
 */
export const provideMockData = () => {
  mocker.addMock("user/auth-token", {
    data: (req: any) => {
      if ((req.data.username = "mostafa" && req.data.password == "123"))
        return mockAuthResponse;

      let err = Error("wrong credentials");

      //@ts-ignore
      err.code = 400;

      return err;
    },
    method: "post",
  });
  mocker.addMock("category", {
    data: { count: mockCategories.length, results: mockCategories },
    method: "get",
  });
  mocker.addMock("movie/?tags", {
    data: { count: mockMovies.length, results: mockMovies },
    method: "get",
  });
  mocker.addMock("movie/?search", {
    data: { count: mockMovies.length, results: mockMovies },
    method: "get",
  });
  mocker.addMock("movie/new", {
    data: mockMovies.slice(0, 3),
    method: "get",
  });
  mocker.addMock("movie/top-rated", {
    data: mockMovies.slice(7, 11),
    method: "get",
  });
  mocker.addMock("movie/popular", {
    data: mockMovies.slice(3, 7),
    method: "get",
  });
};
