import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from "../../../services/products.service";
import { Product } from '../../../models/product.model';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  categoryIdTmp: string | null = null;
  product_padre_category: Product[] = [];
  offset = 0;
  limit = 10;
  productId_CategoryPadre: string | null = null;

  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
  ){ }


  ngOnInit(): void {
    console.log("ngOnInit => category");
    this.router.paramMap
    .pipe(//todo esto va a evitar el callback hell
      switchMap(Parametros => {
        this.offset = 0;
        this.limit = 10;
        this.categoryId = Parametros.get('idCategory');
        //console.log("categoryId => ",this.categoryId);
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId, this.offset, this.limit);
        }
        return [];
      })
    )
    .subscribe(data => {
      //console.log("data ==> ",data);
      this.product_padre_category = data;
    })
    this.router.queryParamMap.subscribe(parametros => {
      this.productId_CategoryPadre = parametros.get('product');
      //console.log(" id del product => ",this.productId_CategoryPadre);
    })
  }

  onCargarMasProductosCategoryPadre(){
    if(this.offset == 0){ //se realizo esto para seguir el flujo de categorias clickeando en cada categoria
      this.offset = 10;
    }
    if (this.categoryId) {
      this.productsService.getByCategory(this.categoryId, this.offset, this.limit)
        .subscribe((data) => {
          //console.log("Antes: offset => ",this.offset," limit => ",this.limit);
          this.product_padre_category = this.product_padre_category.concat(data);
          this.offset += this.limit;
          //console.log("Despues: offset => ",this.offset," limit => ",this.limit);
        });

    }//https://segob.guanajuato.gob.mx:8091/registrodh/
  }
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
