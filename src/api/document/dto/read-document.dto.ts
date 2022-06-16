import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

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

export class SearchDocumentQuery {
  @IsString({ message: 'field는 문자열입니다.' })
  field: string;

  @IsString({ message: 'word는 문자열입니다.' })
  word: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'page는 자연수입니다.' })
  page: number;
}
