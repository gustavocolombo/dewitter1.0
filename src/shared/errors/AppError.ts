export default class AppError {
  private readonly messages: string;

  private readonly statusCode: number;

  constructor(messages: string, statusCode = 400) {
    this.messages = messages;
    this.statusCode = statusCode;
  }
}
