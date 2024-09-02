import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { TomTomAddress, TomTomConfig } from "./types/client";
import { TomTomRawAddressResponse, TomTomRawAddressResult } from "./types/api";
import { ApiError } from "./errors/api";
import axiosRetry from "axios-retry";

export const getSuggestions = async (
  config: TomTomConfig,
  address: string,
): Promise<TomTomAddress[]> => {
  const instance = createInstanceWithRetry();

  const response = await instance
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

const createInstanceWithRetry = (): AxiosInstance => {
  const pluralise = (noun: string, count: number): string =>
    noun + (count === 1 ? "" : "s");

  const instance = axios.create();
  axiosRetry(instance, {
    retryDelay: axiosRetry.exponentialDelay,
    onRetry: (retryCount, error) => {
      if (retryCount < 3) {
        console.warn(
          `Failed to query TomTom API ${retryCount} ${pluralise("time", retryCount)} - retrying: ${error.message}`,
        );
      } else {
        console.error(
          `Failed to query TomTom API ${retryCount} ${pluralise("time", retryCount)} - giving up: ${error.message}`,
        );
      }
    },
  });

  return instance;
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
