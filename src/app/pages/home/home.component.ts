import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {

  product_padre_home: Product[] = [];
  limit = 10;
  offset = 0;

  constructor (
    private productsService: ProductsService
  ) {

  }

  ngOnInit(): void {
    this.productsService.getAllProducts_services(0,10)
    .subscribe(data => {
      this.product_padre_home = data;
      this.offset = this.offset + this.limit;
      console.log("Products =====> ",this.product_padre_home);
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
