import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '@src/common/database/mysql/entities/document.entity';

const mysqlHost = process.env.MYSQL_HOST || '127.0.0.1';
const mysqlPort = process.env.MYSQL_PORT || '3306';
const mysqlUser = process.env.MYSQL_USER || 'root';
const mysqlPw = process.env.MYSQL_PW || 'root';
const mysqlDb = process.env.MYSQL_DB || 'test';

const typeOrmModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'mysql',
    host: mysqlHost,
    port: parseInt(mysqlPort),
    username: mysqlUser,
    password: mysqlPw,
    database: mysqlDb,
    entities: [Document],
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
