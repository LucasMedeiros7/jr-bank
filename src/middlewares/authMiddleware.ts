import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';

type TokenPayload = {
  accountId: string;
  iat: number;
  exp: number;
};

export function authMiddleware(
  request: Request,
  response: Response,
  next: Function
) {
  const { authorization } = request.headers;
  const token = authorization.split(' ')[1];
  try {
    const data = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { accountId } = data as TokenPayload;
    request.account_origin_id = accountId;
    return next();
  } catch {
    return response.sendStatus(403);
  }
}
