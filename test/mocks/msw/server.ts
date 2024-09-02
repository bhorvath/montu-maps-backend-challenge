import { setupServer } from "msw/node";
import { tomtomApis } from "./tomtom";

export const server = setupServer(...tomtomApis);
