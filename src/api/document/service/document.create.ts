import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentBody } from '@src/api/document/dto/create-document.dto';
import { logger } from '@src/common/util/logger/winston-logger';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { Document } from '../model/document.entity';

@Injectable()
export class DocumentCreateService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  public async createDocument(
    body: CreateDocumentBody,
    ip: string,
  ): Promise<boolean> {
    const doc = this.documentRepository.create({
      title: body.title,
      password: body.password,
      content: body.content,
      writerName: body.writerName,
      writerUid: body.writerUid,
      ip: ip,
    });
    await this.documentRepository.save(doc);
    const createdDate = dayjs().unix();
    logger.info(`document was created at ${createdDate}`);
    return true;
  }
}
