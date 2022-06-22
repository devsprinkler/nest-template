import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { logger } from '@src/common/util/logger/winston-logger';
import { Repository } from 'typeorm';
import { Comment } from '@src/api/comment/model/comment.entity';
import { CreateCommentBody } from '@src/api/comment/dto/create-comment.dto';
import { Document } from '@src/api/document/model/document.entity';
import { NestError } from '@src/common/nest/exception/nest-error';

@Injectable()
export class CommentCreateService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async createComment(
    body: CreateCommentBody,
    ip: string,
  ): Promise<boolean> {
    const doc = await this.documentRepository.findOne({
      where: { documentId: body.documentId, deleted: false },
    });

    if (doc == null) {
      throw new NestError(500, 'document not found');
    }

    const comment = this.commentRepository.create({
      documentId: body.documentId,
      password: body.password,
      content: body.content,
      writerName: body.writerName,
      writerUid: body.writerUid,
      ip: ip,
    });
    await this.commentRepository.save(comment);
    const createdDate = new Date().valueOf();
    logger.info(`comment was created at ${createdDate}`);
    return true;
  }
}
