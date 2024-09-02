import { TomTomRawAddressResponse } from "../../src/types/api";
import { TomTomAddress } from "../../src/types/client";

export const mockAddress = "10 high st";
export const mockBogusAddress = "non-existent address";
export const mockErrorAddress = "error";

export const mockTomTomResponseSuccess: TomTomRawAddressResponse = {
  results: [
    {
      id: "mockIdmockId-mockId000",
      address: {
        streetNumber: "10",
        streetName: "High Street",
        localName: "Brisbane",
        countrySubdivision: "Queensland",
        countrySubdivisionCode: "QLD",
        postalCode: "4000",
        countryCode: "AU",
        country: "Australia",
        freeformAddress: "10 High Street, Brisbane, Queensland, 4000",
      },
    },
  ],
};

export const mockTomTomAddresses: TomTomAddress[] = [
  {
    placeId: mockTomTomResponseSuccess.results[0].id,
    freeformAddress:
      mockTomTomResponseSuccess.results[0].address.freeformAddress,
    streetNumber: mockTomTomResponseSuccess.results[0].address.streetNumber,
    streetName: mockTomTomResponseSuccess.results[0].address.streetName,
    municipality: mockTomTomResponseSuccess.results[0].address.localName,
    state: mockTomTomResponseSuccess.results[0].address.countrySubdivision,
    stateCode:
      mockTomTomResponseSuccess.results[0].address.countrySubdivisionCode,
    postcode: mockTomTomResponseSuccess.results[0].address.postalCode,
    countryCode: mockTomTomResponseSuccess.results[0].address.countryCode,
    country: mockTomTomResponseSuccess.results[0].address.country,
  },
];

export const mockTomTomResponseEmpty: TomTomRawAddressResponse = {
  results: [],
};
