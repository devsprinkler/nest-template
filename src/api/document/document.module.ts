import { Module } from '@nestjs/common';
import { DocumentController } from '@src/api/document/document.controller';
import { DocumentCreateService } from '@src/api/document/service/document.create';

@Module({
  imports: [],
  controllers: [DocumentController],
  providers: [DocumentCreateService],
})
export class DocumentModule {}
