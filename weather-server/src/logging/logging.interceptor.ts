
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, ip } = request;
    // const { method, url, ip, query, body } = request;
    // console.log('req:', request)
    // console.log('res:', response)

    const now = Date.now();
    return next
      .handle()
      .pipe(
        // timeout(2000),
        tap(() => {
          console.log(`After... ${Date.now() - now}ms`)
          console.log('***********************')
          console.log(`Method: ${method} [IP: ${ip}]`)
          console.log('***********************')
        }),
        catchError(err => {
          console.log('interceptor catchError!!!!')
          if (err instanceof TimeoutError) {
            return throwError(() => new RequestTimeoutException());
          }
          return throwError(() => err);
        }),
      );
  }
}
