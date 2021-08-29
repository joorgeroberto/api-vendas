import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

// Definindo a rota principal do conjunto de operações de produtos
routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Agora vai!' });
});

export default routes;
