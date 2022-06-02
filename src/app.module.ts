import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { DocumentModule } from '@src/api/document/document.module';

@Module({
  imports: [DocumentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
