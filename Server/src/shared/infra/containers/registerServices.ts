import { asClass, AwilixContainer } from 'awilix';
import { RegisterUserService } from '../../../modules/services/RegisterUserService';
import { AuthenticateUserService } from '../../../modules/services/AuthenticateUserService';
import { UpdatePasswordService } from '../../../modules/services/UpdatePasswordService';
import { CreateEventService } from '../../../modules/services/CreateEventService';

export function registerServices(container: AwilixContainer): void {
  container.register(
    'registerUserService',
    asClass(RegisterUserService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'authenticateUserService',
    asClass(AuthenticateUserService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'updatePasswordService',
    asClass(UpdatePasswordService, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'createEventService',
    asClass(CreateEventService, { lifetime: 'SINGLETON' }),
  );
}
