import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from '../services/token.service'; //envia y obtiene el token en localstorage
import { tap } from 'rxjs/operators';
import { checkTokenn } from '../interceptors/token.interceptor';
//5.- CONTEXTO funcion que va a encender al interceptor
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpApii: HttpClient,
    private TokenService: TokenService
  ) {

  }

  private user = new BehaviorSubject<User | null>(null); //1.- Esta es la declaracion de una variable que va a ser de estado global
                                                        // Se inicializa en nulo porque puede que no este autentificado un usuario
  user$ = this.user.asObservable(); // 2.- Y se va a declarar como un observable para cuando haya cambios se notifique a los suscriptores

  private UrlApi = `${environment.API_URL}/api/auth`;
  private UrlApiCreateUsers = `${environment.API_URL_CREATE_USERS}/api/auth`;

  login(email: string, password: string){
    return this.httpApii.post<Auth>(`${this.UrlApiCreateUsers}/login`,{email, password}) //regresa un Token
      .pipe(
        tap(responsee => this.TokenService.saveToken(responsee.access_token))
        //el tap no afecta el return de la peticion principal, es una operacion secundaria
      )
  }

  profile(){
//profile(token: string){ // se quito por para el funcionamiento del interceptor
//    Profile() ya no se usara porque el token se guardara en services/token en localStorage
//    const header = new HttpHeaders();
//    header.set('Authorization', `Bearer ${token}`);
    return this.httpApii.get<User>(`${this.UrlApiCreateUsers}/profile`, {
        context: checkTokenn()
//      headers: { // se quito por para el funcionamiento del interceptor
//        Authorization: `Bearer ${token}`,
//      'Content-type': 'application/json'
//      }
    })
    .pipe( // Se hizo esto para emitir que ya existe un usuario logeado y se notifica a los suscriptores desde el estado global
      tap(dataUser => {
        this.user.next(dataUser);
      })
    );
  }

  logout(){
    this.TokenService.removeToken();
  }

}
