import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;

    const createUsers = new CreateUserService();
    const user = await createUsers.execute({
      name,
      password,
      email,
    });

    return response.json(user);
  }
}
