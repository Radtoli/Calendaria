import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from '../../../../shared/infra/containers';
import { LoginBodyType } from '../schema/bodies/login/loginBodySchema';
import { AuthenticateUserService } from '../../../services/AuthenticateUserService';

interface IRequest extends FastifyRequest {
  body: LoginBodyType;
}
export async function authenticateUserHandler(
  { body }: IRequest,
  reply: FastifyReply,
) {
  const authenticateUserService = container.resolve<AuthenticateUserService>(
    'authenticateUserService',
  );

  try {
    const token = await authenticateUserService.execute(body);

    if (!token) {
      return reply.status(401).send({ message: 'Invalid credentials' });
    }

    return reply.status(200).send({ message: token });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({ message: 'Internal server error' });
  }
}
