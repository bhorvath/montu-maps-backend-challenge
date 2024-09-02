import axios from "axios";
import { TomTomAddress } from "./types/client";
import {
  TomTomApiConfig,
  TomTomRawAddressResponse,
  TomTomRawAddressResult,
} from "./types/api";

export const getSuggestions = async (
  config: TomTomApiConfig,
  address: string,
): Promise<TomTomAddress[]> => {
  const response = await axios.get<TomTomRawAddressResponse>(
    `https://${config.baseUrl}/search/2/search/${address}.json`,
    {
      params: {
        key: config.key,
      },
    },
  );

  const suggestions = response.data.results.map(formatAddress);

  return suggestions;
};

const formatAddress = (rawAddress: TomTomRawAddressResult): TomTomAddress => {
  return {
    placeId: rawAddress.id,
    freeformAddress: rawAddress.address.freeformAddress,
    streetNumber: rawAddress.address.streetNumber,
    streetName: rawAddress.address.streetName,
    municipality: rawAddress.address.localName,
    state: rawAddress.address.countrySubdivision,
    stateCode: rawAddress.address.countrySubdivisionCode,
    postcode: rawAddress.address.postalCode,
    country: rawAddress.address.country,
    countryCode: rawAddress.address.countryCode,
  };
};
