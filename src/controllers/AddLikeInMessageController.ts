import { Request, Response } from "express";
import AddLikeInMessageService from "../services/AddLikeInMessageService";

export default class AddLikeInMessageController {
  async handle(request: Request, response: Response) {
    const { message_id } = request.params;
    const { user_id } = request;
    
    const service = new AddLikeInMessageService();

    const newLikeInMessage = await service.execute(message_id, user_id);

    return response.json(newLikeInMessage);
  }
}
