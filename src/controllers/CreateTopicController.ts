import { Request, Response } from "express";
import CreateTopicService from "../services/CreateTopicService";

export default class CreateTopicController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { name, description } = request.body;

    const service = new CreateTopicService();

    const newTopic = await service.execute(name, description, user_id);

    return response.json(newTopic);
  }
}
