import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateCommentBody {
  @IsString({ message: 'password는 문자열입니다.' })
  @ValidateIf((obj, val) => val != null)
  password?: string;

  @IsString({ message: 'writerName은 문자열입니다.' })
  writerName: string;

  @IsNumber({}, { message: 'writerUid는 자연수입니다.' })
  @ValidateIf((obj, val) => val != null)
  writerUid?: number;

  @IsNumber({}, { message: 'documentId는 자연수입니다.' })
  documentId: number;

  @IsString({ message: 'content는 문자열입니다.' })
  content: string;
}
