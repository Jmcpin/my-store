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
import { TokenService } from '../services/token.service';
import { tap } from 'rxjs/operators'; // 1.- Ejecuto un proceso sin que tenga que cambiar la respuesta de return que nos envia el Observable

const CHECK_TOKENN = new HttpContextToken<boolean>(() => false);
// 2.- CONTEXTO: Se declara una variable que va a ser un contexto, indicara este conexto en que momento debe correr este interceptor

export function checkTokenn(){ // 3.- CONTEXTO: Esta funcion va habilitar o no la ejecucion de este TokenInterceptor
  return new HttpContext().set(CHECK_TOKENN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKENN)){ // 4.- CONTEXTO: Aqui hace la condicion o validacion si esta prendido este contexto en una peticion
      request = this.addToken(request);
      console.log("requets Token Interceptor => ",request);
      return next.handle(request);
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>){
    const token = this.tokenService.getToken();
    if(token){
      const authRequets = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return authRequets;

    }
    return request;

  }

}
