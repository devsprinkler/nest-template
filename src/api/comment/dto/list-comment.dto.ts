import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ListCommentQuery {
  @Type(() => Number)
  @IsNumber({}, { message: 'documentId는 자연수입니다.' })
  documentId: number;
}
