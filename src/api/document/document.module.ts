import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from '@src/api/document/document.controller';
import { DocumentCreateService } from '@src/api/document/service/document.create';
import { DocumentReadService } from '@src/api/document/service/document.read';
import { DocumentUpdateService } from '@src/api/document/service/document.update';
import { Document } from '@src/common/database/mysql/entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentController],
  providers: [
    DocumentCreateService,
    DocumentReadService,
    DocumentUpdateService,
  ],
})
export class DocumentModule {}
