import { FastifyInstance } from 'fastify';
import { AuthorizationHeadersType } from '../schema/headers/authorizationHeadersSchema';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';
import {
  createEventBodySchema,
  CreateEventBodyType,
} from '../schema/bodies/calendar/createEventBodySchema';
import { responsesSchema } from '../schema/responses/responsesSchema';
import { createEventHandler } from '../handlers/createEventHandler';

export async function calendarRouter(app: FastifyInstance): Promise<void> {
  app.post<{ Headers: AuthorizationHeadersType; Body: CreateEventBodyType }>(
    '/create',
    {
      schema: {
        summary: 'Create a event',
        response: responsesSchema,
        body: createEventBodySchema,
      },
      preHandler: [ensureAuthentication],
    },
    createEventHandler,
  );
}
