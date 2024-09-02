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

    return getSuggestions(this.config, address, options);
  }
}
