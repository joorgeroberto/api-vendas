import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';

const routes = Router();

// Definindo a rota principal do conjunto de operações de produtos
routes.use('/products', productsRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Agora vai!' });
});

export default routes;
