import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from "../../services/products.service";
import { Product } from '../../models/product.model';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  product_padre_category: Product[] = [];
  limit = 10;
  offset = 0;
  productId_CategoryPadre: string | null = null;

  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
  ){ }


  ngOnInit(): void {
    this.onCargarMasProductosCategoryPadre();
  }

  onCargarMasProductosCategoryPadre(){

    this.router.paramMap
    .pipe(//todo esto va a evitar el callback hell
      switchMap(Parametros => {
        this.categoryId = Parametros.get('idCategory');
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId, this.offset, this.limit);
        }
        return [];
      })
    )
    .subscribe(data => {
      this.product_padre_category = this.product_padre_category.concat(data);
        this.offset = this.offset + this.limit;
    });
    this.router.queryParamMap.subscribe(parametros => {
      this.productId_CategoryPadre = parametros.get('product');
      console.log(" id del product => ",this.productId_CategoryPadre);
    })
      /*
    this.router.paramMap.subscribe(rtaParams => {
      this.categoryId = rtaParams.get('idCategory');
      if(this.categoryId){
        this.productsService.getByCategory(this.categoryId, this.offset, this.limit)
        .subscribe(data => {
          this.product_padre_category = this.product_padre_category.concat(data);
          this.offset = this.offset + this.limit;
        })
      }
    })*/
  }
}
