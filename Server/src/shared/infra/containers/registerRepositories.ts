import { asClass, AwilixContainer } from 'awilix';
import { UserRepository } from '../../../modules/repositories/implementation/UserRepository';
import { EventRepository } from '../../../modules/repositories/implementation/EventRepository';

export function registerRepositories(container: AwilixContainer) {
  container.register(
    'userRepository',
    asClass(UserRepository, { lifetime: 'SINGLETON' }),
  );

  container.register(
    'eventRepository',
    asClass(EventRepository, { lifetime: 'SINGLETON' }),
  );
}
