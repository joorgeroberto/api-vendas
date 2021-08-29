import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      // status code 401 para informar que o usuário não está autorizado.
      throw new AppError('Incorrect email or password', 401);
    }

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email or password', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
