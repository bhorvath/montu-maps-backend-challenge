import { AddressOptions, TomTomAddress, TomTomConfig } from "./types/client";
import { getSuggestions } from "./api";
import { ValidationError } from "./errors/validation";
import { InvalidStateError } from "./errors/invalid-state";

export class TomTomClient {
  constructor(private config: TomTomConfig) {
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
