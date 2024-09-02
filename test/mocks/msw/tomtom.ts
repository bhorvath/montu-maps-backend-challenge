import { http, HttpResponse } from "msw";
import { TomTomBaseUrl } from "../../../src/types/client";
import {
  mockAddress,
  mockBogusAddress,
  mockErrorAddress,
  mockRetryAddress,
  mockTomTomResponseEmpty,
  mockTomTomResponseSuccess,
} from "../tomtom";

let requestCount = 0;

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
  // Error, error, success response
  http.get(
    `https://${TomTomBaseUrl.Default}/search/2/search/${encodeURI(mockRetryAddress)}.json`,
    () => {
      requestCount++;

      if (requestCount < 3) {
        return HttpResponse.json(null, {
          status: 500,
          statusText: "Something went wrong",
        });
      } else {
        return HttpResponse.json(mockTomTomResponseSuccess);
      }
    },
  ),
];
