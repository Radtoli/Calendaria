import { hash } from 'bcrypt';
import { RegisterUserBodyType } from '../infra/http/schema/bodies/login/registerUserBodySchema';
import { IUserRepository } from '../repositories/models/IUserRepository';

export class RegisterUserService {
  private saltRounds: number;

  constructor(private userRepository: IUserRepository) {
    this.saltRounds = Number(process.env.SALT_ROUNDS) || 8;
  }

  async execute(user: RegisterUserBodyType): Promise<void> {
    const userExists = await this.userRepository.getByPrioryNumber(
      Number(user.prd_number),
    );

    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(user.password, this.saltRounds);

    await this.userRepository.create({
      prd_adress_city: user.prd_adress.city.toUpperCase(),
      prd_adress_state: user.prd_adress.state.toUpperCase(),
      prd_adress_street: user.prd_adress.street.toUpperCase(),
      prd_adress_zip_code: user.prd_adress.zip_code.toUpperCase(),
      prd_name: user.prd_name.toUpperCase(),
      prd_number: Number(user.prd_number),
      is_admin: false,
      email: user.email.toLowerCase(),
      password: hashedPassword,
      prd_adress_number: user.prd_adress.number.toUpperCase(),
    });
  }
}
