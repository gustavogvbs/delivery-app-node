export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(menssage: string, statusCode = 400) {
    this.message = menssage;
    this.statusCode = statusCode;
  }
}
