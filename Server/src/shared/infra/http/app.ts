import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { config } from 'dotenv';
import fastify from 'fastify';
import { loginRouter } from '../../../modules/infra/http/routes/login.routes';
import { calendarRouter } from '../../../modules/infra/http/routes/calendar.routes';

config();

const app = fastify({
  trustProxy: true,
  logger:
    process.env.NODE_ENV === 'dev'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'dd/mm HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        }
      : true,
});

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'API do calendario de eventos da cavalaria',
      version: '1.0.0',
      contact: {
        email: 'raultorresoliveira@gmail.com',
        name: 'Raul Torres',
      },
      description: 'Gerenciar acessos ao calendario de eventos da cavalaria',
    },
  },
});

app.register(loginRouter, { prefix: '/login' });

app.register(calendarRouter, { prefix: '/calendar' });

app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  staticCSP: true,
});

export { app };
