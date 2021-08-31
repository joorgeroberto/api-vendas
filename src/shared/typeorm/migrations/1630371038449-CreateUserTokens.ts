import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTokens1630371038449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        // chaves estrangeiras da tabela user_tokens
        foreignKeys: [
          {
            name: 'TokenUser',
            // chaves estrangeira referenciando a tabela users
            referencedTableName: 'users',
            // coluna referenciada da OUTRA TABELA (pode ser mais de uma)
            referencedColumnNames: ['id'],
            // coluna DESTA TABELA que faz referencia (pode ser mais de uma)
            columnNames: ['user_id'],
            // Ao deletar ou atualizar em outra tabela, reflete aqui tbm
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens');
  }
}
