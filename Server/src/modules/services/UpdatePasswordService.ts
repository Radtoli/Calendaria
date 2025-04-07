import { hash } from 'bcrypt';
import { ChangePasswordBodyType } from '../infra/http/schema/bodies/login/changePasswordBodySchema';
import { IUserRepository } from '../repositories/models/IUserRepository';

export class UpdatePasswordService {
  private saltRounds: number;

  constructor(private readonly userRepository: IUserRepository) {
    this.saltRounds = Number(process.env.SALT_ROUNDS) || 8;
  }

  async execute(request: ChangePasswordBodyType): Promise<void> {
    const user = await this.userRepository.getByPrioryNumber(
      Number(request.prd_number),
    );

    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await hash(request.new_password, this.saltRounds);

    await this.userRepository.update({ ...user, password: hashedPassword });
  }
}
