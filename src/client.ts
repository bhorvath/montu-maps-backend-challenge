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
