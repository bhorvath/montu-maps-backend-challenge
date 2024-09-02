import { ApplicationError } from "./application";

export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super("Validation error", message);
  }
}
