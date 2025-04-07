import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUserBodyType } from '../schema/bodies/login/registerUserBodySchema';
import { container } from '../../../../shared/infra/containers';
import { RegisterUserService } from '../../../services/RegisterUserService';

interface IRequest extends FastifyRequest {
  body: RegisterUserBodyType;
}

export async function registerUserHandler(
  { body }: IRequest,
  reply: FastifyReply,
) {
  if (!/(@demolaybrasil\.org\.br)/.test(body.email)) {
    reply.code(400).send({ message: 'Invalid Email' });
  }

  const registerUserService = container.resolve<RegisterUserService>(
    'registerUserService',
  );

  try {
    await registerUserService.execute(body);

    reply.send();
  } catch (error) {
    if (error.message === 'User already exists') {
      reply.code(409).send({ message: error.message });
    }
  }

  await registerUserService.execute(body);

  reply.send();
}
