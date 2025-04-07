import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateEventBodyType } from '../schema/bodies/calendar/createEventBodySchema';
import { container } from '../../../../shared/infra/containers';
import { CreateEventService } from '../../../services/CreateEventService';

interface IRequest extends FastifyRequest {
  body: CreateEventBodyType;
}

export async function createEventHandler(
  { body }: IRequest,
  reply: FastifyReply,
) {
  const createEventService =
    container.resolve<CreateEventService>('createEventService');

  try {
    await createEventService.execute(body);

    return reply.status(201).send({ message: 'Event created successfully' });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message });
    }

    return reply.status(500).send({ message: 'Internal server error' });
  }
}
