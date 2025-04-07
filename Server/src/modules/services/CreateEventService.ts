import { CreateEventBodyType } from '../infra/http/schema/bodies/calendar/createEventBodySchema';
import { IEventRepository } from '../repositories/models/IEventRepository';
import { IUserRepository } from '../repositories/models/IUserRepository';

export class CreateEventService {
  constructor(
    private userRepository: IUserRepository,
    private eventRepository: IEventRepository,
  ) {}

  async execute(request: CreateEventBodyType): Promise<void> {
    const user = await this.userRepository.getByPrioryNumber(
      request.prd_number,
    );

    if (!user) {
      throw new Error('User not found');
    }

    for (const eventInstance of request.event_details) {
      await this.eventRepository.create({
        user_id: user,
        type: eventInstance.type,
        horario: new Date(eventInstance.horario),
        local: eventInstance.local,
      });
    }
  }
}
