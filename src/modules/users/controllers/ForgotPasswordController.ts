import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
    await sendForgotPasswordEmail.execute({
      email,
    });

    // 204 indica um "no content" mas que tudo foi criado com sucesso.
    return response.status(204).json();
  }
}
