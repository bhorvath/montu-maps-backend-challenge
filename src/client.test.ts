import { mockAddress } from "../test/mocks/tomtom";
import { TomTomClient } from "./client";
import { ValidationError } from "./errors/validation";
import { TomTomBaseUrl, TomTomConfig } from "./types/client";

describe("TomTomClient", () => {
  const config: TomTomConfig = {
    baseUrl: TomTomBaseUrl.Default,
    key: "x",
  };

  describe("getAutoCompleteDetails()", () => {
    it("returns a promise", () => {
      const client = new TomTomClient(config);
      const result = client.getAutoCompleteDetails(mockAddress);

      expect(result).toBeInstanceOf(Promise);
    });

    it("throws an error if no address is provided", async () => {
      const client = new TomTomClient(config);

      await expect(client.getAutoCompleteDetails("")).rejects.toThrow(
        ValidationError,
      );
    });
  });
});
