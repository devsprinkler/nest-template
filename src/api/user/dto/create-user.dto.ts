import { IsString } from 'class-validator';

export class CreateUserRequestBody {
  @IsString({ message: 'email은 문자열입니다.' })
  email: string;

  @IsString({ message: 'password는 문자열입니다.' })
  password: string;

  @IsString({ message: 'nickname은 문자열입니다.' })
  nickname: string;
}
