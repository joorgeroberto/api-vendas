import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// decorator que indica que esta classe é uma entidade e
// a tabela que esta entidade faz o mapeamento.
@Entity('products')
class Product {
  // Decorator que informa que é chave primaria e
  // qual o tipo de informação que será gerada automaticamente.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // String não precisa informar o tipo.
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
