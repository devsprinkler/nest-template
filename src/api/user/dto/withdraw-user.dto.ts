import { IsString } from 'class-validator';

export class WithdrawUserRequestBody {
  @IsString({ message: 'email은 문자열입니다.' })
  email: string;

  @IsString({ message: 'password는 문자열입니다.' })
  password: string;
}
