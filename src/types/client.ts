export type TomTomConfig = {
  baseUrl: TomTomBaseUrl;
  key: string;
};

// See documentation: https://developer.tomtom.com/search-api/documentation/product-information/region-specific-content
export enum TomTomBaseUrl {
  Default = "api.tomtom.com",
  SouthKorea = "kr-api.tomtom.com",
}

export type TomTomAddress = {
  placeId: string;
  freeformAddress: string;
  streetNumber: string | undefined;
  streetName: string;
  municipality: string;
  state: string;
  stateCode: string;
  postcode: string;
  country: string;
  countryCode: string;
};

export type AddressOptions = {
  country?: Country;
  // The TomTom API defaults to 10 if this isn't specified and has a maximum limit of 100.
  limit?: number;
};

// See here for additional country codes: https://developer.tomtom.com/search-api/documentation/product-information/market-coverage
export enum Country {
  Australia = "AU",
}
