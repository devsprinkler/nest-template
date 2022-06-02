import { Module } from '@nestjs/common';
import { DocumentController } from '@src/api/document/document.controller';
import { DocumentCreateService } from '@src/api/document/service/document.create';
import { DocumentReadService } from '@src/api/document/service/document.read';
import { DocumentUpdateService } from '@src/api/document/service/document.update';

@Module({
  imports: [],
  controllers: [DocumentController],
  providers: [
    DocumentCreateService,
    DocumentReadService,
    DocumentUpdateService,
  ],
})
export class DocumentModule {}
