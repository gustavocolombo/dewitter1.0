import { Request, Response } from "express";
import PaginateMessagesOfUserService from "../services/PaginateMessagesOfUserService";

export default class PaginateMessagesOfUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const service = new PaginateMessagesOfUserService();

    const paginateMessages = await service.execute(user_id);

    return response.json(paginateMessages);
  }
}
