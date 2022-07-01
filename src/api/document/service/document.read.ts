import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Document,
  LIST_DOC_LIMIT,
} from '@src/api/document/model/document.entity';
import { NestError } from '@src/common/nest/exception/nest-error';
import { ErrorCode } from '@src/common/network/errorcode';
import { logger } from '@src/common/util/logger/winston-logger';
import { Like, Repository } from 'typeorm';

@Injectable()
export class DocumentReadService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  public async singleDocument(documentId: number): Promise<Document> {
    try {
      const doc = await this.documentRepository.findOne({
        where: { documentId: documentId, deleted: false },
      });
      return doc;
    } catch (err) {
      logger.error(err);
      throw new NestError(ErrorCode.DATABASE_FAIL, 'find document failed');
    }
  }

  public async listDocument(page: number): Promise<Document[]> {
    try {
      const docs = await this.documentRepository.find({
        where: { deleted: false },
        skip: (page - 1) * LIST_DOC_LIMIT,
        take: LIST_DOC_LIMIT,
      });

      return docs;
    } catch (err) {
      logger.error(err);
      throw new NestError(ErrorCode.DATABASE_FAIL, 'find documents failed');
    }
  }

  public async searchDocument(
    field: string,
    word: string,
    page: number,
  ): Promise<Document[]> {
    if (field === 'titleAndContent') {
      try {
        const docs = await this.documentRepository.find({
          where: [
            { title: Like(`%${word}%`), deleted: false },
            { content: Like(`%${word}%`), deleted: false },
          ],
          skip: (page - 1) * LIST_DOC_LIMIT,
          take: LIST_DOC_LIMIT,
        });
        return docs;
      } catch (err) {
        logger.error(err);
        throw new NestError(ErrorCode.DATABASE_FAIL, 'find document failed');
      }
    } else if (field === 'writer') {
      try {
        const docs = await this.documentRepository.find({
          where: { writerName: Like(`%${word}%`), deleted: false },
          skip: (page - 1) * LIST_DOC_LIMIT,
          take: LIST_DOC_LIMIT,
        });
        return docs;
      } catch (err) {
        logger.error(err);
        throw new NestError(ErrorCode.DATABASE_FAIL, 'find document failed');
      }
    } else {
      throw new NestError(
        ErrorCode.INVALID_PARAMETER,
        'invalid parameter field',
      );
    }
  }
}
