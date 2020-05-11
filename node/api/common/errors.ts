export class AuthorizationError extends Error {
  constructor(message?: string) {
    super(message); // 'Error' breaks prototype chain here
    this.name = "AuthorizationError";
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message); // 'Error' breaks prototype chain here
    this.name = "ValidationError";
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
