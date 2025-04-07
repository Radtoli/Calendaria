import { DataSource, Repository } from 'typeorm';
import { IEventRepository } from '../models/IEventRepository';
import { PrioryEvent } from '../../infra/typeorm/Event';
import { ICreateEventDTO } from '../../dto/ICreateEventDTO';

export class EventRepository implements IEventRepository {
  private ormRepository: Repository<PrioryEvent>;

  constructor(trfsDataSource: DataSource) {
    this.ormRepository = trfsDataSource.getRepository(PrioryEvent);
  }

  async create(event: ICreateEventDTO): Promise<PrioryEvent> {
    const newEvent = this.ormRepository.create(event);
    await this.ormRepository.save(newEvent);
    return newEvent;
  }
}
