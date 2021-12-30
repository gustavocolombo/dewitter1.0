import axios from "axios";
import { sign } from "jsonwebtoken";
import prismaClient from "../prisma";

interface IAccessToken {
  access_token: string;
}

interface IUserDataRequest {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

export default class OAuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessToken>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const response = await axios.get<IUserDataRequest>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }
    );

    const { avatar_url, id, login, name } = response.data;

    let user = await prismaClient.users.findFirst({
      where: { github_id: id },
    });

    if (!user) {
      user = await prismaClient.users.create({
        data: {
          avatar_url,
          github_id: id,
          login,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
        },
      },
      "a3dcb4d229de6fde0db5686dee47145d",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}
