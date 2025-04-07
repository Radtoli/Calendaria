import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const trfsDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  schema: 'calendaria',
  synchronize: false,
  logging: false,
  migrationsTableName: 'migration',
  entities:
    process.env.NODE_ENV === 'prod'
      ? ['dist/modules/infra/typeorm/*.js']
      : ['src/modules/infra/typeorm/*.ts'],
  migrations:
    process.env.NODE_ENV === 'prod'
      ? ['dist/shared/infra/databases/migrations/*.js']
      : ['src/shared/infra/databases/migrations/*.ts'],
});
