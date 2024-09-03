// Scaled down versions below of the full response with only the fields we care about.
// See the documentation for more info: https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search#response-data

export type TomTomRawAddressResponse = {
  results: TomTomRawAddressResult[];
};

export type TomTomRawAddressResult = {
  id: string;
  address: {
    streetNumber: string;
    streetName: string;
    countrySubdivision: string;
    countrySubdivisionCode: string;
    postalCode: string;
    countryCode: string;
    country: string;
    freeformAddress: string;
    // The TomTom API always gives a `municipality` but _may_ also give a
    // finer grained `municipalitySubdivision`, which is more appropriate for
    // Australian addresses at the very least. The `localName` field appears to
    // give the finer grained of the two, so let's just use that for now.
    localName: string;
  };
};
