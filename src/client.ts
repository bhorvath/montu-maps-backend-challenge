import { TomTomAddress, TomTomConfig } from "./types/client";
import { getSuggestions } from "./api";
import { ValidationError } from "./errors/validation";

export class TomTomClient {
  constructor(private config: TomTomConfig) {}

  public async getAutoCompleteDetails(
    address: string,
  ): Promise<TomTomAddress[]> {
    if (!address) {
      throw new ValidationError("You must provide an address");
    }

    return getSuggestions(this.config, address);
  }
}
