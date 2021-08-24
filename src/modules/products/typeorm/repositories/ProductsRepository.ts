import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    // Vai retornar o primeiro registro onde o name vai ser identico
    // ao name passado no patametro da classe.
    const product = this.findOne({
      where: { name },
    });

    return product;
  }
}
