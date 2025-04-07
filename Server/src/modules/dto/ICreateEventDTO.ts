import { EventType } from '../../shared/enums/EventType';
import { User } from '../infra/typeorm/User';

export interface ICreateEventDTO {
  type: EventType;
  horario: Date;
  local: string;
  user_id: User;
}
