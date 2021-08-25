import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

// Interface para "tipar" as informações que recebemos na requisição.
// Interfaces, por convenção, começam com I maiúsculo.
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

// Cada serviço, deve ter apenas uma responsabilidade (um único método).
// Serviços são relacionados as regras de negócio da aplicação
// (Regras de criar produto, deletar, etc)
class CreateProductService {
  // A principio, poderiamos utilizar assim:
  // public async execute(data: IRequest): Promise<Product> {}

  // Mas, iremos desestruturar para simplificar nosso código:
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    // Buscando um repositorio customizado.
    const productsRepository = getCustomRepository(ProductRepository);

    // Com isto, temos acesso a todos os métodos deste repositório.
    // Iremos utilizar o findByName criado anteriormente para verificar se um produto existe.
    // Senão existir, poderemos criar um produto com este nome.
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    // Create não precisa de await pois não é um método assíncrono.
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
