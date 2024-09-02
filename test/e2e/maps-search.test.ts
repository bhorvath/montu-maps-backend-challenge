import { config } from "dotenv";
import {
  TomTomAddress,
  TomTomBaseUrl,
  TomTomConfig,
} from "../../src/types/client";
import { TomTomClient } from "../../src/client";

config();

describe("Tomtom Places E2E Tests", () => {
  const config: TomTomConfig = {
    baseUrl: TomTomBaseUrl.Default,
    key: process.env.TOMTOM_API_KEY as string,
  };

  it("fetches an address from the TomTom API", async () => {
    const client = new TomTomClient(config);
    const result = await client.getAutoCompleteDetails("Charlotte Street");
    const expected: TomTomAddress = {
      placeId: "Nf4Uq_-AvdeFlnOvm4TmuQ",
      freeformAddress: "Great Charlotte Street, Liverpool, L1 1HU",
      streetNumber: undefined,
      streetName: "Great Charlotte Street",
      municipality: "Liverpool",
      state: "ENG",
      stateCode: "ENG",
      postcode: "L1",
      country: "United Kingdom",
      countryCode: "GB",
    };

    expect(result[0]).toEqual(expected);
  });

  it("handles no match from the TomTom API", async () => {
    const client = new TomTomClient(config);
    const result = await client.getAutoCompleteDetails("asfasffasfasafsafs");

    expect(result).toEqual([]);
  });
});
