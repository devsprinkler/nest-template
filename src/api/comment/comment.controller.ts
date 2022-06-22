import { Body, Controller, Get, Patch, Post, Query, Ip } from '@nestjs/common';
import { CreateCommentBody } from '@src/api/comment/dto/create-comment.dto';
import { ListCommentQuery } from '@src/api/comment/dto/list-comment.dto';
import { UpdateCommentBody } from '@src/api/comment/dto/update-comment.dto';
import { CommentCreateService } from '@src/api/comment/service/comment.create';
import { CommentReadService } from '@src/api/comment/service/comment.read';
import { CommentUpdateService } from '@src/api/comment/service/comment.update';

@Controller('/comment')
export class CommentController {
  constructor(
    private readonly commentCreateService: CommentCreateService,
    private readonly commentReadService: CommentReadService,
    private readonly commentUpdateService: CommentUpdateService,
  ) {}

  @Post()
  public async createComment(@Ip() ip, @Body() body: CreateCommentBody) {
    return this.commentCreateService.createComment(body, ip);
  }

  @Get('/list')
  public async listComment(@Query() query: ListCommentQuery) {
    return this.commentReadService.listComment(query.documentId);
  }

  @Patch()
  public async updateComment(@Body() body: UpdateCommentBody) {
    return this.commentUpdateService.updateComment(body);
  }
}
