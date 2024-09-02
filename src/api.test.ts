import { getSuggestions } from "./api";
import { TomTomApiConfig, TomTomBaseUrl } from "./types/api";
import { mockAddress, mockBogusAddress, mockTomTomAddresses } from "../test/mocks/tomtom";

describe("getSuggestions()", () => {
  const config: TomTomApiConfig = {
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
});
