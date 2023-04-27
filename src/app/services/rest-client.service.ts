import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, retry , map} from 'rxjs/operators';
import { Constants } from '../constants/constants';

var _this;

@Injectable({
  providedIn: 'root'
})
export class RestClient {
  private httpOptions:any;
  constructor( @Inject(HttpClient) private http: HttpClient, private router: Router) {
    _this = this;
  }

  getHeader(){
    return this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
  }

  public appendHeaders(key: string, value: string) {
      this.httpOptions.headers.set(key, value);
      localStorage.setItem(key, value);
  }

  public removeHeaders(key: string) {
      this.httpOptions.headers.delete(key);
  }

  public get(url: any): Observable<any> {
      return this.http.get<any>(url);
  }

  public put(url: any, data: any):Observable<any> {
      return this.http.put(url, data, this.getHeader()).
      pipe(catchError(this.handleError));
  }

  public post(url: any, data: any) :Observable<any>{
      return this.http.post(url, data, this.getHeader()).
      pipe(catchError(this.handleError));
  }

  public delete(url: any) :Observable<any>{
      return this.http.delete(url, this.getHeader()).
      pipe(catchError(this.handleError));
  }

  download(url: any): Observable<ArrayBuffer>{
    let headers = new HttpHeaders();

    const options: any = {
      responseType: 'arraybuffer'
    };

    return this.http
      .get(url, options)
      .pipe(
      map((file: ArrayBuffer) => {
        return file;
      })
    );
  }

  upload(url: any, data: any) :Observable<any>{
    return this.http.post(url, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {

    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned error :${error}`);

    // return an observable with a user-facing error message
    let errorMessage = error || "Something went wrong!!";
    if(Array.isArray(errorMessage)) {
      errorMessage = errorMessage[0];
    }

    return throwError(
      errorMessage);
  };
}
