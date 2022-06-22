import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '@src/api/document/model/document.entity';
import { User } from '@src/api/user/model/user.entity';

const mysqlHost = process.env.MYSQL_HOST || '127.0.0.1';
const mysqlPort = parseInt(process.env.MYSQL_PORT) || 3306;
const mysqlUser = process.env.MYSQL_USER || 'root';
const mysqlPw = process.env.MYSQL_PW || '1234';
const mysqlDb = process.env.MYSQL_DB || 'sample';

const typeOrmModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'mysql',
    host: mysqlHost,
    port: mysqlPort,
    username: mysqlUser,
    password: mysqlPw,
    database: mysqlDb,
    entities: [Document, User],
    retryAttempts: 3,
    retryDelay: 1000,
    keepConnectionAlive: true,
  }),
});

@Module({
  imports: [typeOrmModule, TypeOrmModule.forFeature([User, Document])],
  exports: [typeOrmModule],
})
export class MysqlModule {}
