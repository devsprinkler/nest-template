import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDocumentBody } from '@src/api/document/dto/update-document.dto';
import { NestError } from '@src/common/nest/exception/nest-error';
import { logger } from '@src/common/util/logger/winston-logger';
import { Repository } from 'typeorm';
import { Document, PW_HASH_KEY } from '@src/api/document/model/document.entity';
import crypto from 'crypto';

@Injectable()
export class DocumentUpdateService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  private isPasswordCorrect(password: string, hashed: string): boolean {
    const h = crypto
      .createHmac('sha256', PW_HASH_KEY)
      .update(password)
      .digest('hex');

    logger.info(`a: ${h}, b: ${hashed}`);

    return h === hashed;
  }

  public async updateDocument(body: UpdateDocumentBody): Promise<boolean> {
    const doc = await this.documentRepository.findOne({
      where: { documentId: body.documentId, deleted: false },
      select: {
        documentId: true,
        writerName: true,
        writerUid: true,
        password: true,
        ip: true,
        deleted: true,
      },
    });

    logger.info(JSON.stringify(doc));

    if (doc == null) {
      throw new NestError(500, 'no such document');
    }

    if (body.password) {
      if (!this.isPasswordCorrect(body.password, doc.password)) {
        throw new NestError(500, 'incorrect password');
      }
    } else if (body.writerUid !== Number(doc.writerUid)) {
      throw new NestError(500, 'uid not matched');
    }

    doc.title = body.title;
    doc.content = body.content;
    doc.deleted = body.deleted;

    await this.documentRepository.save(doc);

    const updatedDate = new Date().valueOf();
    logger.info(`document was updated at ${updatedDate}`);
    return true;
  }
}
