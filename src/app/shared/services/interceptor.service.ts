import { Injectable, Inject } from '@angular/core';
import { HttpHandler } from '@angular/common/http';
import {
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { filter, map, catchError } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { BASE_URL_TOKEN } from 'src/app/config';

export interface IRes {
  data: any;
  error?: string;
}
@Injectable()
export class InterceptorService implements HttpInterceptor {
  // tslint:disable-next-line: variable-name
  constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string) {}

  public intercept<T extends IRes>(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpResponse<T>> {
    const headers: HttpHeaders = req.headers.append(
      'Content-Type',
      'application/json'
    );
    const jsonReq: HttpRequest<T> = req.clone({
      headers,
      url: `${this._baseUrl}${req.url}`,
    });
    return next.handle(jsonReq).pipe(
      filter(this._isHttpResponse),
      map((res: HttpResponse<IRes>) => {
        return res.clone({ body: res.body && res.body.data });
      }),
      catchError((error) => {
        return EMPTY;
      })
    );
  }
  private _isHttpResponse(event: HttpEvent<any>): event is HttpResponse<IRes> {
    if (event instanceof HttpResponse) {
      return true;
    }
    return false;
  }
}
