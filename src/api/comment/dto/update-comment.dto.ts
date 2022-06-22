import { IsBoolean, IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateCommentBody {
  @IsNumber({}, { message: 'commentId는 자연수입니다.' })
  commentId: number;

  @IsString({ message: 'password는 문자열입니다.' })
  @ValidateIf((obj, val) => val != null)
  password?: string;

  @IsNumber({}, { message: 'writerUid는 자연수입니다.' })
  @ValidateIf((obj, val) => val != null)
  writerUid?: number;

  @IsString({ message: 'content는 문자열입니다.' })
  content: string;

  @IsBoolean({ message: 'deleted는 T/F입니다.' })
  deleted: boolean;
}
