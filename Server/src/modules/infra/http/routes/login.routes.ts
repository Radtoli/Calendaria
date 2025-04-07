import { FastifyInstance } from 'fastify';
import {
  registerUserBodySchema,
  RegisterUserBodyType,
} from '../schema/bodies/login/registerUserBodySchema';
import { registerUserHandler } from '../handlers/registerUserHandler';
import { responsesSchema } from '../schema/responses/responsesSchema';
import { authenticateUserHandler } from '../handlers/authenticateUserHandler';
import {
  loginBodySchema,
  LoginBodyType,
} from '../schema/bodies/login/loginBodySchema';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';
import { changePasswordHandler } from '../handlers/changePasswordHandler';
import { AuthorizationHeadersType } from '../schema/headers/authorizationHeadersSchema';

export async function loginRouter(app: FastifyInstance): Promise<void> {
  app.get(
    '/health',
    {
      schema: {
        summary: 'Check application health',
      },
    },
    (_request, reply) => {
      reply.send();
    },
  );

  app.post<{ Body: RegisterUserBodyType }>(
    '/register',
    {
      schema: {
        summary: 'Register users on the application',
        body: registerUserBodySchema,
        response: responsesSchema,
      },
    },
    registerUserHandler,
  );

  app.post<{ Body: LoginBodyType }>(
    '/authenticate',
    {
      schema: {
        summary: 'Authenticate users on the application',
        body: loginBodySchema,
        response: responsesSchema,
      },
    },
    authenticateUserHandler,
  );

  app.post<{ Headers: AuthorizationHeadersType }>(
    '/forgot-password',
    {
      schema: {
        summary: 'Send email to reset password',
        response: responsesSchema,
      },
      preHandler: [ensureAuthentication],
    },
    changePasswordHandler,
  );
}
