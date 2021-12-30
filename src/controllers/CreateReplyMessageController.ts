import { Request, Response } from "express";
import CreateReplyMessageService from "../services/CreateReplyMessageService";

export default class CreateReplyMessage {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { message_id } = request.params;
    const { message_reply } = request.body;

    const service = new CreateReplyMessageService();
    const replyMessage = await service.execute(
      message_id,
      user_id,
      message_reply
    );

    return response.json(replyMessage);
  }
}
