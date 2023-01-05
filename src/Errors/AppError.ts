class AppError extends Error {
  statuscode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statuscode = statusCode;
  }
}

export { AppError };
