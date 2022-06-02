import { Module } from '@nestjs/common';
import { DocumentController } from '@src/api/document/document.controller';
import { DocumentCreateService } from '@src/api/document/service/document.create';
import { DocumentReadService } from '@src/api/document/service/document.read';

@Module({
  imports: [],
  controllers: [DocumentController],
  providers: [DocumentCreateService, DocumentReadService],
})
export class DocumentModule {}
