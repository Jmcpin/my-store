import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
   ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user$ //se hizo el pipe y el map porque se quiere devolver un obervable como booleano
    .pipe(
      map(user => { // verifica si en el estado global existe un usuario que se logeo
      if(!user){
        this.router.navigate(['/home']);//Va a reedireccionar a la ruta '/home'
        return false;
      }
      return true;
      })
    )


    /*
    const token = this.tokenService.getToken();
    if(!token){ //Si no existe un token, va a mandar un false
      this.router.navigate(['/home']);//Va a reedireccionar a la ruta '/home'
      return false
    }
    //return token ? true : false;
    return true;
    */
  }

}
