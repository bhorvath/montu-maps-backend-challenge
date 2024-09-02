import { http, HttpResponse } from "msw";
import { TomTomBaseUrl } from "../../../src/types/client";
import {
  mockAddress,
  mockBogusAddress,
  mockErrorAddress,
  mockTomTomResponseEmpty,
  mockTomTomResponseSuccess,
} from "../tomtom";

export const tomtomApis = [
  // Success response
  http.get(
    `https://${TomTomBaseUrl.Default}/search/2/search/${encodeURI(mockAddress)}.json`,
    () => {
      return HttpResponse.json(mockTomTomResponseSuccess);
    },
  ),
  // Empty response
  http.get(
    `https://${TomTomBaseUrl.Default}/search/2/search/${encodeURI(mockBogusAddress)}.json`,
    () => {
      return HttpResponse.json(mockTomTomResponseEmpty);
    },
  ),
  // Error response
  http.get(
    `https://${TomTomBaseUrl.Default}/search/2/search/${encodeURI(mockErrorAddress)}.json`,
    () => {
      return HttpResponse.json(null, {
        status: 500,
        statusText: "Something went wrong",
      });
    },
  ),
];
