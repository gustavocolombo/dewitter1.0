import { Request, Response } from "express";
import AddReplyInMessageService from "../services/AddReplyInMessageService";

export default class AddReplyInMessageController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { message_id } = request.params;

    const service = new AddReplyInMessageService();

    const addReply = await service.execute(user_id, message_id);

    return response.json(addReply);
  }
}
