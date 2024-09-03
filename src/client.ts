import { AddressOptions, TomTomAddress, TomTomConfig } from "./types/client";
import { getSuggestions } from "./api";
import { ValidationError } from "./errors/validation";
import { InvalidStateError } from "./errors/invalid-state";

export class TomTomClient {
  constructor(private config: TomTomConfig) {
    // TODO: Instead of requiring a base URL, set TomTomBaseUrl.Default if one
    // isn't provided. I omitted this for now as it makes types a bit messy.
    if (!config.baseUrl) {
      throw new InvalidStateError("You must provide a base URL");
    }

    if (!config.key) {
      throw new InvalidStateError("You must provide an API key");
    }
  }

  /**
   * Takes a partial address as an input and uses the TomTom API to return the
   * best matching addresses broken down into their individual components.
   *
   * @param address The partial address to search for.
   * @param options Options to modify the behaviour of the search.
   * @param options.country The search can be restricted to a particular country.
   * Only Australia is currently supported.
   * @param options.limit A limit can be placed upon the number of suggestions
   * returned. The maximum limit is 100.
   *
   * @returns An array of addresses broken down into their individual components.
   */
  public async getAutoCompleteDetails(
    address: string,
    options?: AddressOptions,
  ): Promise<TomTomAddress[]> {
    if (!address) {
      throw new ValidationError("You must provide an address");
    }

    // The TomTom API has a maximum limit of 100.
    if (
      options?.limit !== undefined &&
      (options.limit < 1 || options.limit > 100)
    ) {
      throw new ValidationError("Limit must be between 1 and 100");
    }

    return getSuggestions(this.config, address, options);
  }
}
