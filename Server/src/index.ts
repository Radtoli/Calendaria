import { app } from './shared/infra/http/app';
import { startEnvironment } from './shared/utils/startEnv';

console.log('ta rolando');
startEnvironment().then(async () => {
  app.listen({ port: Number(process.env.PORT), host: '0.0.0.0' });
});
