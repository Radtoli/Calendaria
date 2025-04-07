import { compare } from 'bcrypt';
import { IUserRepository } from '../repositories/models/IUserRepository';
import { LoginBodyType } from '../infra/http/schema/bodies/login/loginBodySchema';
import { sign, SignOptions } from 'jsonwebtoken';

export class AuthenticateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(credentials: LoginBodyType): Promise<string> {
    const user = await this.userRepository.getByEmail(
      credentials.email.toLowerCase(),
    );

    if (!user) {
      throw new Error('Email ou senha incorretos');
    }

    const passwordMatch = await compare(credentials.password, user.password);

    if (!passwordMatch) {
      throw new Error('Email ou senha incorretos');
    }

    const payload = {
      prd_number: user.prd_number,
      email: user.email,
      is_admin: user.is_admin,
    };

    const jwtSecret = process.env.JWT_SECRET || 'default_secret';

    const jwtOptions: SignOptions = {
      subject: user.prd_number.toString(),
      expiresIn: Number(process.env.JWT_EXPIRES_IN) * 60 * 24,
    };

    const token = sign(payload, jwtSecret, jwtOptions);

    return token;
  }
}
