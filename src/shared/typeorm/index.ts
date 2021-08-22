import { createConnection } from 'typeorm';

// Procura em todo o projeto pelo arquivo ormconfig que possui os parâmetros
// e configurações do banco de dados (No nosso caso, será o Postgres).
createConnection();
