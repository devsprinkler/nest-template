import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '@src/api/comment/model/comment.entity';

@Injectable()
export class CommentReadService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async listComment(documentId: number): Promise<Comment[]> {
    const comments = this.commentRepository.find({
      where: {
        documentId: documentId,
        deleted: false,
      },
    });
    return comments;
  }
}
