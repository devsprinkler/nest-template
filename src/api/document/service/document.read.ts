import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Document,
  LIST_DOC_LIMIT,
} from '@src/api/document/model/document.entity';
import { NestError } from '@src/common/nest/exception/nest-error';
import { Like, Repository } from 'typeorm';

@Injectable()
export class DocumentReadService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  public async singleDocument(documentId: number): Promise<Document> {
    const doc = await this.documentRepository.findOne({
      where: { documentId: documentId, deleted: false },
    });
    if (doc == null) {
      throw new NestError(500, 'document not found');
    }
    return doc;
  }

  public async listDocument(page: number): Promise<Document[]> {
    const docs = await this.documentRepository.find({
      where: { deleted: false },
      skip: (page - 1) * LIST_DOC_LIMIT,
      take: LIST_DOC_LIMIT,
    });

    return docs;
  }

  public async searchDocument(
    field: string,
    word: string,
    page: number,
  ): Promise<Document[]> {
    if (field === 'titleAndContent') {
      const docs = await this.documentRepository.find({
        where: [
          { title: Like(`%${word}%`), deleted: false },
          { content: Like(`%${word}%`), deleted: false },
        ],
        skip: (page - 1) * LIST_DOC_LIMIT,
        take: LIST_DOC_LIMIT,
      });
      return docs;
    } else if (field === 'writer') {
      const docs = await this.documentRepository.find({
        where: { writerName: Like(`%${word}%`), deleted: false },
        skip: (page - 1) * LIST_DOC_LIMIT,
        take: LIST_DOC_LIMIT,
      });
      return docs;
    } else {
      throw new NestError(500, 'invalid field');
    }
  }
}
