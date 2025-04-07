import { FastifyRequest, FastifyReply } from 'fastify';
import { verify } from 'jsonwebtoken';
import { AuthorizationHeadersType } from '../schema/headers/authorizationHeadersSchema';

interface IRequest extends FastifyRequest {
  headers: AuthorizationHeadersType;
}

export async function ensureAuthentication(
  request: IRequest,
  reply: FastifyReply,
) {
  if (process.env.NODE_ENV !== 'prod') {
    return;
  }

  const { authorization } = request.headers;

  if (!authorization) {
    reply.status(401).send({ error: 'Token não fornecido' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET || 'default_secret';

  try {
    const token = authorization.replace('Bearer ', '');

    const decoded = verify(token, jwtSecret);

    console.log(decoded);
  } catch (error) {
    reply.status(401).send({ error: 'Token inválido ou expirado' });
  }
}
