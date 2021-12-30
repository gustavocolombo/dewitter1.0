import { Request, Response } from "express";
import CreateMessageService from "../services/CreateMessageService";

export default class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { topics_id } = request.params;
    const { user_id } = request;
    const { text } = request.body;

    const service = new CreateMessageService();

    const newMessage = await service.execute(text, topics_id, user_id);

    return response.json(newMessage);
  }
}
