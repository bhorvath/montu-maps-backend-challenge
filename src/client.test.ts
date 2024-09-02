import { mockAddress } from "../test/mocks/tomtom";
import { TomTomClient } from "./client";
import { InvalidStateError } from "./errors/invalid-state";
import { ValidationError } from "./errors/validation";
import { TomTomBaseUrl, TomTomConfig } from "./types/client";

describe("TomTomClient", () => {
  const config: TomTomConfig = {
    baseUrl: TomTomBaseUrl.Default,
    key: "x",
  };

  describe("constructor", () => {
    it("throws an error if a base URL is not provided", () => {
      expect(() => new TomTomClient({ key: "x" } as TomTomConfig)).toThrow(
        InvalidStateError,
      );
    });

    it("throws an error if an API key is not provided", () => {
      expect(
        () =>
          new TomTomClient({ baseUrl: TomTomBaseUrl.Default } as TomTomConfig),
      ).toThrow(InvalidStateError);
    });
  });

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

    const limitValidationTests: {
      input: number;
      description: string;
    }[] = [
      { input: 0, description: "less than 1" },
      { input: 101, description: "greated than 100" },
    ];

    limitValidationTests.forEach(({ input, description }) => {
      it(`throws an error if the given limit is ${description}`, async () => {
        const client = new TomTomClient(config);

        await expect(
          client.getAutoCompleteDetails(mockAddress, { limit: input }),
        ).rejects.toThrow(ValidationError);
      });
    });
  });
});
