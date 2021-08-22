import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

//Middlewares padrão, possuem apenas 3 parametros: Requesty, response e next.
// Middlewares para tratamento de erros possuem 4: Os 3 informados acima e o error.
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // Se for um erro conhecido (tratado e, portanto instancia da nossa classe AppError)
    // Retornaremos um erro estruturado abaixo.
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    // Se for um erro desconhecido e não tratado,
    // retornamos um erro desconhecido para o front end.
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆');
});
