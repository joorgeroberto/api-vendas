import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUsers = new CreateSessionsService();
    const user = await createUsers.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
