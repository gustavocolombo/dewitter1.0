import { Request, Response } from "express";
import OAuthenticateUserService from "../services/OAuthenticateUserService";

export default class OAuthenticateController {
  async handle({ code }: Request, response: Response) {
    const newOauth = await (new OAuthenticateUserService()).execute(code);

    return response.json(newOauth);
  }
}
