import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from  '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-product-datail',
  templateUrl: './product-datail.component.html',
  styleUrls: ['./product-datail.component.scss']
})
export class ProductDatailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(//todo esto va a evitar el callback hell
      switchMap(Parametros => {
        this.productId = Parametros.get('idProducto');
        if(this.productId){
          return this.productsService.getEvent_Detalle_Product_Padre(this.productId);
        }
        return [null];
      })
    )
    .subscribe(data => {
      this.product = data;
      console.log("this.product => ",this.product);
    });
  }

  goToBack(){
    this.location.back();
  }
}
