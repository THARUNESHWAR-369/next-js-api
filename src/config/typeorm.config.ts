import { User } from '../user.entity';
import { TypeOrmModuleOptions } from './../../node_modules/@nestjs/typeorm/dist/interfaces/typeorm-options.interface.d';

console.log( process.env.DB_TYPE, process.env.DB_USER);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password:  process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: [User],
  synchronize: true,
};