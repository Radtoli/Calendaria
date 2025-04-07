import { ICreateEventDTO } from '../../dto/ICreateEventDTO';
import { PrioryEvent } from '../../infra/typeorm/Event';

export interface IEventRepository {
  create(event: ICreateEventDTO): Promise<PrioryEvent>;
}
