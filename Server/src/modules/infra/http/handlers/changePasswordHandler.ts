import { FastifyReply, FastifyRequest } from 'fastify';
import { ChangePasswordBodyType } from '../schema/bodies/login/changePasswordBodySchema';
import { container } from '../../../../shared/infra/containers';
import { UpdatePasswordService } from '../../../services/UpdatePasswordService';

interface IRequest extends FastifyRequest {
  body: ChangePasswordBodyType;
}

export async function changePasswordHandler(
  { body }: IRequest,
  reply: FastifyReply,
) {
  const updatePasswordService = container.resolve<UpdatePasswordService>(
    'updatePasswordService',
  );

  try {
    await updatePasswordService.execute(body);

    reply.send({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    if (error.message === 'User not found') {
      reply.code(404).send({ message: error.message });
    } else {
      reply.code(500).send({ message: 'Erro ao alterar a senha' });
    }
  }
}
