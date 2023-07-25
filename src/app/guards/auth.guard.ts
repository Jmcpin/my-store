import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from './../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
   ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getToken();
    if(!token){ //Si no existe un token, va a mandar un false
      this.router.navigate(['/home']);//Va a reedireccionar a la ruta '/home'
    }
    //return token ? true : false;
    return true;
  }

}
