import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    const date = new Date();

    return next.handle().pipe(
      map((data) => {
        return {
          timestamp: date.toISOString(),
          result: true,
          data: data,
        };
      }),
    );
  }
}
