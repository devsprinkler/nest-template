import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { logger } from '@src/common/util/logger/winston-logger';
import { Repository } from 'typeorm';
import {
  Comment,
  COMMENT_HASH_KEY,
} from '@src/api/comment/model/comment.entity';
import { NestError } from '@src/common/nest/exception/nest-error';
import { UpdateCommentBody } from '@src/api/comment/dto/update-comment.dto';
import crypto from 'crypto';

@Injectable()
export class CommentUpdateService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  private isPasswordCorrect(password: string, hashed: string): boolean {
    const h = crypto
      .createHmac('sha256', COMMENT_HASH_KEY)
      .update(password)
      .digest('hex');

    return h === hashed;
  }

  public async updateComment(body: UpdateCommentBody): Promise<boolean> {
    const comment = await this.commentRepository.findOne({
      where: { commentId: body.commentId, deleted: false },
      select: {
        commentId: true,
        password: true,
        content: true,
        writerUid: true,
      },
    });

    if (comment == null) {
      throw new NestError(500, 'comment not found');
    }

    if (body.writerUid == null) {
      if (!this.isPasswordCorrect(body.password, comment.password)) {
        throw new NestError(500, 'incorrect password');
      }
    } else {
      if (body.writerUid !== comment.writerUid) {
        throw new NestError(500, 'incorrect uid');
      }
    }

    comment.content = body.content;
    comment.deleted = body.deleted;

    await this.commentRepository.save(comment);
    const updatedDate = new Date().valueOf();
    logger.info(`comment was updated at ${updatedDate}`);
    return true;
  }
}
