import { Module } from '@nestjs/common';
import { CommentController } from '@src/api/comment/comment.controller';
import { CommentCreateService } from '@src/api/comment/service/comment.create';
import { CommentReadService } from '@src/api/comment/service/comment.read';
import { CommentUpdateService } from '@src/api/comment/service/comment.update';

@Module({
  controllers: [CommentController],
  providers: [CommentCreateService, CommentReadService, CommentUpdateService],
})
export class CommentModule {}
