import { Injectable } from '@nestjs/common';
import { UpdateDocumentDto } from '@src/api/document/dto/update-document.dto';
import { logger } from '@src/common/util/logger/winston-logger';
import dayjs from 'dayjs';

@Injectable()
export class DocumentUpdateService {
  // constructor(private readonly documentRepository) {}

  public async updateDocument(
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<boolean> {
    // TODO: create document in database
    const updatedDate = dayjs().unix();
    logger.info(`document was updated at ${updatedDate}`);
    return true;
  }
}
