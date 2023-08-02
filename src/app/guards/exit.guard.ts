import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Uno mismo crea la interface
export interface OnExit { // Nombre de la Interface
  OnExit: () => Observable<boolean> | Promise<boolean> | boolean; // Nombre de la funcion ONExit, es diferente al nombre de la interface
}

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: OnExit,
    //component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return component.OnExit ? component.OnExit() : true // Si component tiene la funciona OnExit entonces que se ejecute la funcion del componente,
                                                      // pero si no, poner en true, es decir, permitir la salida para que pueda salir de la pagina actual
                                                      // Si fuera false, no le permitiria salir de la pagina actual
                                                      // Esto se hizo para tener la logica desde un component llamando desde la interface
                                                      // y la otra forma es la logica aqui mismo en el guardian y la logica es la siguiente...

    //  const rta = confirm('Estas seguro de salir?');
    //  return rta;
    //return false;// en false quiere decir que no le voy a permitir salir

  }

}
