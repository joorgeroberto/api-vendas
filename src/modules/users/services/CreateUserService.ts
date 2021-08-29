import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

class CreateUser {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userWithThisEmailAlreadyExists = await usersRepository.findByEmail(
      email,
    );

    if (userWithThisEmailAlreadyExists) {
      throw new AppError('Email address already used.');
    }

    const user = usersRepository.create({
      name,
      password,
      email,
    });
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUser;
