import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetUserInfoQuery {
  @Type(() => Number)
  @IsNumber({}, { message: 'uid는 자연수입니다.' })
  uid: number;
}
