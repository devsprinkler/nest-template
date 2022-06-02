import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from '@src/api/document/dto/create-document.dto';
import { logger } from '@src/common/util/logger/winston-logger';
import * as dayjs from 'dayjs';

@Injectable()
export class DocumentCreateService {
  // constructor(private readonly documentRepository) {}

  public async createDocument(
    createDocumentDto: CreateDocumentDto,
  ): Promise<boolean> {
    // TODO: create document in database
    const createdDate = dayjs().unix();
    logger.info(`document was created at ${createdDate}`);
    return true;
  }
}
