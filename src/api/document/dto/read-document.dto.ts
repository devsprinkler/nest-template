import { IsInt } from 'class-validator';

export class ReadDocumentQuery {
  @IsInt({ message: 'documentId는 자연수입니다.' })
  documentId: number;
}

export class ReadDocumentResponse {
  data;
}

export class ListDocumentQuery {
  @IsInt({ message: 'page는 자연수입니다.' })
  page: number;
}

export class ListDocumentResponse {
  data;
}
