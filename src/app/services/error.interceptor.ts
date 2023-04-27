import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";

import { BackendService } from './backend.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private backendService: BackendService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.router.navigate(['sign-in'], { queryParams: { redirect: this.router.url } });
        this.backendService.logout();
      }
      if (err.status === 404) {
        // if 404 code return redirect to page not found
        this.router.navigate(['not-found']);
      }

      const error = err.error.errors || err.statusText;
      return throwError(error);
    }))
  }
}