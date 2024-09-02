import { TomTomAddress, TomTomConfig } from "./types/client";
import { getSuggestions } from "./api";

export class TomTomClient {
  constructor(private config: TomTomConfig) {}

  public async getAutoCompleteDetails(
    address: string,
  ): Promise<TomTomAddress[]> {
    return getSuggestions(this.config, address);
  }
}
