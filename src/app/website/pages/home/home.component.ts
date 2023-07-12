import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {

  product_padre_home: Product[] = [];
  offset = 0;
  limit = 10;
  productId_HomePadre: string | null = null;

  constructor (
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.productsService.getAllProducts_services(this.offset, this.limit)
    .subscribe(data => {
      this.product_padre_home = data;
      this.offset = this.offset + this.limit;
    });
    this.route.queryParamMap.subscribe(parametros => {
      this.productId_HomePadre = parametros.get('product');
      console.log("productID => ",this.productId_HomePadre);
    });
  }

  onCargarMasProductosPadre(){
    this.productsService.getAllProducts_services(this.offset, this.limit)
    .subscribe((data) => {
      this.product_padre_home = this.product_padre_home.concat(data);
      this.offset = this.offset + this.limit;
    })
  }

}
