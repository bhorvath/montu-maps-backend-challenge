import { ApplicationError } from "./application";

export class ApiError extends ApplicationError {
  constructor(message: string) {
    super("API error", message);
  }
}
