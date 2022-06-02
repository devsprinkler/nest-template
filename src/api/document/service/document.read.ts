import { Injectable } from '@nestjs/common';
import { logger } from '@src/common/util/logger/winston-logger';

@Injectable()
export class DocumentReadService {
  // constructor(private readonly documentRepository) {}

  public async singleDocument(documentIndex: number): Promise<any> {
    // TODO: read document from database
    logger.info(`document was read`);
    return {
      title: 'title',
      body: 'body',
      writerName: 'writer',
      writerUid: '',
      comments: [],
    };
  }

  public async listDocument(page: number): Promise<any[]> {
    // TODO: read list of document from database
    logger.info('list of document was read');
    return ['doc1', 'doc2', 'doc3'];
  }
}
