import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
//17 - Angular Router: Lazy LOading y Programacion modular - All Modules y Custom Strategy
@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> { //Debe retornar un observable
    if (route.data && route.data['preload']) { //si route.data['preload'] = true
      return load(); //retorna un observable y con esto se va a precargar el modulo
    }
    return of(null); // //retorna un observable en vacio, y con esto no precarga el modulo actual
  }

}
