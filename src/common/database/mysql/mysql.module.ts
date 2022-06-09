import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const mysqlHost = process.env.MYSQL_HOST || '127.0.0.1';
const mysqlPort = process.env.MYSQL_PORT || '3306';

const typeOrmModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'mysql',
    host: mysqlHost,
    port: parseInt(mysqlPort),
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [],
    retryAttempts: 3,
    retryDelay: 1000,
    keepConnectionAlive: true,
  }),
});

@Module({
  imports: [typeOrmModule],
  exports: [typeOrmModule],
})
export class MysqlModule {}
