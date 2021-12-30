import { Request, Response } from "express";
import OAuthenticateUserService from "../services/OAuthenticateUserService";

export default class OAuthenticateController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    const service = new OAuthenticateUserService();

    const newOauth = await service.execute(code);

    return response.json(newOauth);
  }
}
