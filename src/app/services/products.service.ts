import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
import { Product, Producto_nuevo_tipado, Product_Update_tipado } from '../models/product.model';
import { environment } from './../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';
//5.- CONTEXTO funcion que va a encender al interceptor

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private UrlApi = `${environment.API_URL}/api`;

  constructor(
    private http_Apii: HttpClient
  ) { }

  getAllProducts_services(offset: number, limit: number){ // Consultar la lista de todos los productos
    /*                    offset?: number, limit?: number */
    let params = new HttpParams;
    if(offset !== null && limit !== null){
      params = params.set('offset', offset);
      params = params.set('limit', limit);
    }
    return this.http_Apii.get<Product[]>(`${this.UrlApi}/products`, { params, context: checkTime() })
    // 6.- CONTEXTO: Se coloca context: checkTime() para encencer el interceptor en esta peticion (requets)
    .pipe(
      retry(3),
      map(arrayProducts => arrayProducts.map(item => {
        return {
          ...item,
          impuesto: .19 * item.price
        }
      }))
      // Map: Permite evaluar cada uno de los valores que lleguen en el observable, es decir, todo el array
      // y así poder aplicar una transofmración de peticion
    );
  }

  getEvent_Detalle_Product_Padre(id: string){ // Consultar Un producto en especifico
    return this.http_Apii.get<Product>(`${this.UrlApi}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError(() => new Error ("Algo esta fallando en el servidor"));
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError(() => new Error ("El producto no existe"));
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError(() => new Error ("No estas permitido"))
        }
        return throwError(() => new Error ("Ups, salio algo mal"))
      })
    )
  }

  create_New_Product(id: Producto_nuevo_tipado){ // Insertar un nuevo producto
    return this.http_Apii.post<Product>(`${this.UrlApi}/products`, id);
  }

  update_Product(id: string, changes_Update: Product_Update_tipado){
    return this.http_Apii.put<Product>(`${this.UrlApi}/products/${id}`, changes_Update);
  }

  deleteProduct(id: string){
    return this.http_Apii.delete<boolean>(`${this.UrlApi}/products/${id}`)
  }

  getProductsByPage(offset: number, limit: number){
    return this.http_Apii.get<Product[]>(`${this.UrlApi}/products`, {
      params: { offset, limit }
    })
    .pipe(
      retry(3)
    );
  }

  fetchReadAndUpdate(id: string, changes_Update: Product_Update_tipado){
    return zip(
      this.getEvent_Detalle_Product_Padre(id),
      this.update_Product(id, changes_Update)
    );
  }

  getByCategory(idCategory: string, offset: number, limit: number){
    let params = new HttpParams;
    if(offset !== null && limit !== null){
      params = params.set('offset', offset);
      params = params.set('limit', limit);
    }
      return this.http_Apii.get<Product[]>(`${this.UrlApi}/categories/${idCategory}/products`, { params })
  }

}
