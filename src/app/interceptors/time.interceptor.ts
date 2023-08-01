import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext, // 1.- CONTEXTO: Importar Contexto para la escucha de los requets (peticiones)
  HttpContextToken, // 1.- CONTEXTO: Importar Contexto para la escucha de los requets (peticiones)
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Ejecuto un proceso sin que tenga que cambiar la respuesta de return que nos envia el Observable

const CHECK_TIME = new HttpContextToken<boolean>(() => false);
// 2.- CONTEXTO: Se declara una variable que va a ser un contexto, indicara este conexto en que momento debe correr este interceptor

export function checkTime(){ // 3.- CONTEXTO: Esta funcion va habilitar o no la ejecucion de este TimeInterceptor
  return new HttpContext().set(CHECK_TIME, true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  //constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TIME)){ // 4.- CONTEXTO: Aqui hace la condicion o validacion si esta prendido este contexto en una peticion
      const start = performance.now();
      return next
        .handle(request)
        .pipe(
          tap(() => {
            const time = (performance.now() - start) + ' ms';
            console.log(request.url, time," ms ---")
          })
        );
    }
    return next.handle(request);
  }
}
