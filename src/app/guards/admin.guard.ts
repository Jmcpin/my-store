import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

constructor(
  private authService: AuthService,
  private router: Router
) {

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.user$
      .pipe(
        map(user => {
          if(user?.role === 'admin'){ //Si tiene un role que admin entonces si dejar visualizar el guards
            return true;
          } else { // si no tiene un role que no es admin entonces no dejar entrar y redireccionar al home
            this.router.navigate(['/home']);
            return false;
          }
        })
      )
      //return true;
  }

}
