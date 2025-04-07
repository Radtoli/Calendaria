import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../models/IUserRepository';
import { User } from '../../infra/typeorm/User';
import { ICreateUserDTO } from '../../dto/ICreateUserDTO';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor(trfsDataSource: DataSource) {
    this.ormRepository = trfsDataSource.getRepository(User);
  }

  async create(user: ICreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create(user);

    await this.ormRepository.save(newUser);

    return newUser;
  }

  async getByPrioryNumber(prd_number: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOneBy({ prd_number });

    return user;
  }

  async update(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOneBy({ email });

    return user;
  }
}
