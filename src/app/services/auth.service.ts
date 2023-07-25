import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from '../services/token.service'; //envia y obtiene el token en localstorage
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpApii: HttpClient,
    private TokenService: TokenService
  ) {

  }

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
//      headers: { // se quito por para el funcionamiento del interceptor
//        Authorization: `Bearer ${token}`,
//      'Content-type': 'application/json'
//      }
    });
  }

  logout(){
    this.TokenService.removeToken();
  }

}
