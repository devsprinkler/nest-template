import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '@src/common/database/mysql/entities/document.entity';
import { NestError } from '@src/common/nest/exception/nest-error';
import { Repository } from 'typeorm';

const LIST_DOC_LIMIT = 30;

@Injectable()
export class DocumentReadService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  public async singleDocument(documentIndex: number): Promise<Document> {
    const doc = await this.documentRepository.findOne({
      where: { documentIndex: documentIndex, deleted: false },
    });
    if (doc == null) {
      throw new NestError(500, 'document not found');
    }
    return doc;
  }

  public async listDocument(page: number): Promise<Document[]> {
    const docs = await this.documentRepository.find({
      where: { deleted: false },
      skip: page,
      take: LIST_DOC_LIMIT,
    });

    if (docs.length == 0) {
      throw new NestError(500, 'document not found');
    }
    return docs;
  }
}
