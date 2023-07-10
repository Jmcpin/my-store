import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, Producto_nuevo_tipado, Product_Update_tipado } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators'; //alternativa para evita el callback hell que dependen una de otra
//import { zip } from 'rxjs'; //comprimen o abjunta dos o mas observadores para que se ejecuten al mismo tiempo

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart_Products: Product[] = [];

  totalCar = 0;

  @Input() product_padre: Product[] = [];
  //@Input() productId: string | null = null;
  @Input()
    set productId_HijoProducts(id: string | null){
      if(id){
        this.Event_Detalle_Product_Padre(id);
      }
    }
  @Output() CargarMasProductosEmitter = new EventEmitter();

  today = new Date();

  date = new Date(2021, 1, 21);

  showProductDetail = false;

  Producto_Ver_Detalle: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
    }
  }

  limit = 10;

  offset = 0;

  estadoDetalleProducto: "init" | "loading" | "success" | "error" = "init"

  /*product_padre: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: 'https://source.unsplash.com/random'
    }
  ];*/

  constructor (
    private storeService: StoreService,
    private productsService: ProductsService
  )
  {
    this.myShoppingCart_Products = this.storeService.getShoppingCart_Services();
  }
/*
  ngOnInit(): void {

    this.productsService.getAllProducts_services(0,10)
    .subscribe(data => {
      console.log(data);
      this.product_padre = data;
    });

  }
*/
  onAddShoppingCart(product: Product){
    console.log(product);
    this.storeService.addShoppingCart_Services(product);
    this.totalCar = this.storeService.TotalShoppingCart_Services();
    //this.myShoppingCart_Products.push(product);
    //this.totalCar = this.myShoppingCart_Products.reduce((sum, item) => sum + item.price, 0)
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  Event_Detalle_Product_Padre(id: string){
    this.estadoDetalleProducto = "loading"
    //this.toggleProductDetail();
    if(!this.showProductDetail){// si esta cerrado (falso)... entonces abrirlo
      this.showProductDetail = true //se abre la ventana (true)
    }
    this.productsService.getEvent_Detalle_Product_Padre(id)
    .subscribe(data => {
      console.log("Dato del ID", data);
    //  this.toggleProductDetail();
      this.Producto_Ver_Detalle = data;
      this.estadoDetalleProducto = "success";
    }, errorMsg => {
    // }, response => {
    //  console.log(response.error.error);
    //  console.log(response);
      this.estadoDetalleProducto = "error";
      Swal.fire({
        icon: 'error',
        title: errorMsg,
        text: 'errorMsg',
        confirmButtonText: 'Cerrar'
      })
    })
  }

  CreateNewProduct(){
    const producto_nuevo: Producto_nuevo_tipado = {
      title: 'Nuevo Titulo',
      price: 2000,
      images: ['https://placeimg.com/640/480/any'],
      description: 'Nueva descripcion',
      categoryId: 2,
    }
    this.productsService.create_New_Product(producto_nuevo)
    .subscribe(data => {
      console.log("Nuevo producto ", data);
      this.product_padre.unshift(data);
    });
  }

  Btn_Click_Update_Product(){
    const update_producto_exist: Product_Update_tipado = {
      title: 'Nuevo Titulo mas chido',
    }
    this.productsService.update_Product(this.Producto_Ver_Detalle.id, update_producto_exist)
    .subscribe(data => {
      console.log(data);
    });
  }

  deleteProduct(){
    const id = this.Producto_Ver_Detalle.id;
    this.productsService.deleteProduct(id)
    .subscribe(data => {
      console.log(data);
      this.toggleProductDetail();
      const index = this.product_padre.findIndex(item => item.id === id);
      this.product_padre.splice(index,1);
    })
  }

  getProductsByPageBtn(){
    this.productsService.getAllProducts_services(this.offset,this.limit)
    .subscribe(data => {
      this.product_padre = this.product_padre.concat(data);
      this.offset = + this.offset + this.limit;
      console.log("Products =====> ",this.product_padre);
    });
  }

  /*
  readAndUpdate(id: string){
    this.productsService.getEvent_Detalle_Product_Padre(id)
    .subscribe(data => {
      this.productsService.update_Product(data.id, {title: 'nuevo titulooooo'})
      .subscribe(rtaUpdate => {
        console.log("ya quedo leido y subido",rtaUpdate)
      })
    })
  }
  */

  readAndUpdate(id: string){
    this.productsService.getEvent_Detalle_Product_Padre(id)
    .pipe(
      switchMap((product) => this.productsService.update_Product(product.id, {title: 'nuevo titulin'})),
    )
    .subscribe(data => {
      console.log(data);
    });

    this.productsService.fetchReadAndUpdate(id, {title: 'nuevo titulin'})
    .subscribe(response => {
      console.log(response);
    })
  }

  CargarMasProductos() {
    this.CargarMasProductosEmitter.emit();
  }

}
