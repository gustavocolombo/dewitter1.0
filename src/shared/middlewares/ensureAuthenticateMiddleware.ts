import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
}

export default function ensureAuthenticateMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    return response.status(404).json({ message: "JWT token is missing" });
  }

  const [, token] = authHeaders.split(" ");

  try {
    const { sub } = verify(
      token,
      "a3dcb4d229de6fde0db5686dee47145d"
    ) as TokenPayload;

    request.user_id = sub;

    return next();
  } catch {
    return response
      .status(400)
      .json({ message: "Cannot performat this function" });
  }
}
