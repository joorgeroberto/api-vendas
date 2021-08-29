import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      // Status code 401 para informar que o usuário não está autorizado.
      throw new AppError('Incorrect email or password', 401);
    }

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email or password', 401);
    }

    // Configutando token
    // hash gerando usando o site: http://www.md5.cz/
    // Inserindo caracteres aleatorios
    const token = sign({}, '096a47bccd0994b7cc7ae46eb592f17c', {
      subject: user.id,
      expiresIn: '1d', // token com validade de um dia
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
