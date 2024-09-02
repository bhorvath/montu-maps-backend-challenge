import { ApplicationError } from "./application";

export class InvalidStateError extends ApplicationError {
  constructor(message: string) {
    super("Invalid state error", message);
  }
}
