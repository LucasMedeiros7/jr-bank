import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';

export function authMiddleware(
  request: Request,
  response: Response,
  next: Function
) {
  const { authorization } = request.headers;
  const token = authorization.split(' ')[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account_id) => {
    if (err) {
      return response.sendStatus(403);
    }
    request.account_origin_id = account_id;
    return response.json(account_id);
  });
}
