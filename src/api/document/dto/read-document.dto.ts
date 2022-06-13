import { IsNumber } from 'class-validator';

export class ReadDocumentQuery {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  documentId: number;
}

export class ReadDocumentResponse {
  data;
}

export class ListDocumentQuery {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  page: number;
}

export class ListDocumentResponse {
  data;
}
