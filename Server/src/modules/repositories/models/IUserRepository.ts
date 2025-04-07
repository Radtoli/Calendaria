import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { User } from '../../infra/typeorm/User';

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  getByPrioryNumber(prd_number: number): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
}
