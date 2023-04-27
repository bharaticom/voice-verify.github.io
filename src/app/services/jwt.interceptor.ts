import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BackendService } from './backend.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private backendService: BackendService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: "Token 27372ffdb3e2db3945a6ca3c06e68e57ee772065"
      }
    });

    return next.handle(request);
  }
}