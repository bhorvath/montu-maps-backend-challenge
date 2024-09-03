## Installation

Install project dependencies.

```
yarn install
```

## Usage

This project does not currently exist in a registry, however you may still add it to other projects as a local dependency. Take care to use the correct relative path.

```
yarn add file:./../montu-maps-backend-challenge
```

You can now create an instance of the client with your TomTom API key. In most cases, you should use the base URL.

```
import { TomTomBaseUrl, TomTomClient, TomTomConfig } from "@montu/maps-backend-challenge";

const config: TomTomConfig = {
  baseUrl: TomTomBaseUrl.Default,
  key: "x",
};

const client = new TomTomClient(config);
```

Call `getAutoCompleteDetails()` to retrieve address suggestions. The TomTom API supports fuzzy searching, so you may enter a partial address.

```
const addresses = client.getAutoCompleteDetails("high st");
```

You can limit the number of returned search results with the `limit` option. The maximum limit is 100.

```
const addresses = client.getAutoCompleteDetails("high st", { limit: 20 });
```

You can also restrict results by country.

```
const addresses = client.getAutoCompleteDetails("high st", { country: Country.Australia });
```

## Testing

Unit tests and E2E tests are run separately. Unit tests use [MSW](https://mswjs.io/) to mock network requests to the TomTomAPI. E2E tests make real requests to the API and therefore require a working API key; this should be defined in the `TOMTOM_API_KEY` environment variable. A `.env` file may also be used for this.

To run unit tests.

```
yarn test:unit
```

To run E2E tests.

```
yarn test:e2e
```

# Original Tech Test

## Scenario:

A developer on our team was working on integrating the TomTom API. They did a great job laying the groundwork, but they've recently been promoted to a new project that requires their full attention.

We are pretty confident the developer managed to complete the majority of the initial part of the integration, however there might be a bug or two to be discovered.

Your task is to finish off this implementation, ensuring the requirements are met with passing tests.

## Task:

To take a partial address input and return full address suggestions along with the address broken into its individual components using the TomTom API.

## Resources:

Place Search Documentation: https://developer.tomtom.com/search-api/documentation/search-service/search-service
API Key:

## Install:

1. yarn install

## Test:

1. yarn install
2. yarn test

## Requirements:

1. All tests should pass and ensure good coverage for new work
2. We only allow Australian addresses to be returned
3. Code should be maintainable and consistent
4. The result elements should contain important information about the place (country, municipality, etc)
5. The returned result should be typed and easily consumable via users of the library
6. No front-end requirements are necessary, this is purely a backend NodeJS library
