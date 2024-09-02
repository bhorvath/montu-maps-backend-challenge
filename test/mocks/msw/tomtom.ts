import { http, HttpResponse } from "msw";
import { TomTomBaseUrl } from "../../../src/types/api";
import { mockAddress, mockBogusAddress, mockTomTomResponseEmpty, mockTomTomResponseSuccess } from "../tomtom";

export const tomtomApis = [
  http.get(
    `https://${TomTomBaseUrl.Default}/search/2/search/${encodeURI(mockAddress)}.json`,
    () => {
      return HttpResponse.json(mockTomTomResponseSuccess);
    },
  ),
  http.get(
    `https://${TomTomBaseUrl.Default}/search/2/search/${encodeURI(mockBogusAddress)}.json`,
    () => {
      return HttpResponse.json(mockTomTomResponseEmpty);
    },
  ),
];
