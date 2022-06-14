import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ReadDocumentQuery {
  @Type(() => Number)
  @IsNumber({}, { message: 'documentId는 자연수입니다.' })
  documentId: number;
}

export class ListDocumentQuery {
  @Type(() => Number)
  @IsNumber({}, { message: 'page는 자연수입니다.' })
  page: number;
}
