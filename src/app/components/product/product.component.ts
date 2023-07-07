import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product_hijo!: Product; // con el signo de exclamación le decimos a Angular (o Typescript)
                                  //que esa propiedad si va a existir, que no puede ser nula,
  @Output() addedProductHijo = new EventEmitter<Product>();
  @Output() Event_Detalle_Product_Hijo = new EventEmitter<string>();
  /*
  @Input() product_hijo: Product = {
    id: '',
    name: '',
    price: 0,
    image: ''
  };
  */

  onAddToCart(){
    this.addedProductHijo.emit(this.product_hijo);
  }
  onBtnDetalleProducto(id: string){
    this.Event_Detalle_Product_Hijo.emit(id);
  }

}
