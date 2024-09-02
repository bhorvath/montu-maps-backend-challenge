export class ApplicationError extends Error {
  constructor(
    public override name: string,
    public override message: string,
  ) {
    super(`${name} - ${message}`);
  }
}
