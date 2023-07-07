 import { Injectable } from '@angular/core';
 import { Product } from '../models/product.model';
 import { BehaviorSubject } from 'rxjs'; // 1.- se importa la clase BehaviorSubject que ayudará a crear una propiedad observable

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart_Services: Product[] = [];
  private myCarNavHeader = new BehaviorSubject<Product[]>([]); // 2.- Instanciación de la clase BehaviorSubject con una nueva variable
                                                              // con tipado de array y inicializacion de 0 []

  myCarNavHeader$ = this.myCarNavHeader.asObservable(); // 3.- Declaración del observable

  addShoppingCart_Services(product: Product){
    this.myShoppingCart_Services.push(product);
    this.myCarNavHeader.next(this.myShoppingCart_Services); // 4.- Con esto se emite a los componentes que estan subscritos al observable myCarNavHeader
  }

  TotalShoppingCart_Services(){
    return this.myShoppingCart_Services.reduce((sum, item) => sum + item.price, 0);
  }

  getShoppingCart_Services(){
    return this.myShoppingCart_Services;
  }

}
