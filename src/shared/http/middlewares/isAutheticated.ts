import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number; // timestamp de quando o token foi criado
  exp: number; // timestamp de quando o token irá expirar
  sub: string; // userID
}

export default function isAutheticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  // Desestruturando token com a estrutura:
  // Bearer "token"
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    // request não possui user, por isso, iremos sobreescrever o request e
    // adicioná-lo dentro da pasta @types/express.
    // Agora, todas as rotas que passarem por este middleware terão o id do usuário.
    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.', 401);
  }
}
