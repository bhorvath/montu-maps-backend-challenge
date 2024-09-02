import axios, { AxiosError, AxiosResponse } from "axios";
import { TomTomAddress, TomTomConfig } from "./types/client";
import { TomTomRawAddressResponse, TomTomRawAddressResult } from "./types/api";
import { ApiError } from "./errors/api";

export const getSuggestions = async (
  config: TomTomConfig,
  address: string,
): Promise<TomTomAddress[]> => {
  const response = await axios
    .get<TomTomRawAddressResponse>(
      `https://${config.baseUrl}/search/2/search/${address}.json`,
      {
        params: {
          key: config.key,
        },
      },
    )
    .catch(handleAxiosError);

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

const handleAxiosError = (
  error: unknown,
): AxiosResponse<TomTomRawAddressResponse> => {
  let message: string;

  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.request?.data?.message) {
      message = error.request.data.message;
    } else {
      message = error.message;
    }
  } else {
    message = error as string;
  }

  throw new ApiError(message);
};
