import { TomTomConfig, TomTomBaseUrl } from "./types/client";
import { getSuggestions } from "./api";
import {
  mockAddress,
  mockBogusAddress,
  mockErrorAddress,
  mockTomTomAddresses,
} from "../test/mocks/tomtom";
import { ApiError } from "./errors/api";

describe("getSuggestions()", () => {
  const config: TomTomConfig = {
    baseUrl: TomTomBaseUrl.Default,
    key: "x",
  };

  it("returns correctly formatted addresses from the API", async () => {
    const result = await getSuggestions(config, mockAddress);

    expect(result).toEqual(mockTomTomAddresses);
  });

  it("handles returning no addresses", async () => {
    const result = await getSuggestions(config, mockBogusAddress);

    expect(result).toEqual([]);
  });

  it("handles errors", async () => {
    await expect(getSuggestions(config, mockErrorAddress)).rejects.toThrow(
      ApiError,
    );
  });
});
