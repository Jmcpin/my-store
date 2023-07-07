import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
    .handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError(() => new Error ("Algo esta fallando en el servidor"));
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError(() => new Error ("El usuario no existe"));
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError(() => new Error ("No estas permitido"))
        }
          return throwError(() => new Error ("Ups, salio algo mal"))
      })
    )
  }
}
