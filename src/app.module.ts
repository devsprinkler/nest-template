import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
