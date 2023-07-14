import { Component, Input, Output, EventEmitter } from '@angular/core';
//import { Component, Input, Output, EventEmitter, OnChanges, OnInit, AfterViewInit, OnDestroy, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
//export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  //@Input('img-tmp') img: string = "";
  //@Input() img: string = "";

  img = "";

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
    set changeImg(newImg: string){
      this.img = newImg;
      //console.log("Cambios en el input img => ", this.img);
    }

  @Output() loaded = new EventEmitter<string>();

  banderaError = false;

  imgDefault = "../../../assets/descargar.png";

  //count = 0;
  //countFn: number | undefined;

  constructor() {
    // Befire render - Antes de renderizar el componente
    // NO async -- once time -- No asincrono, solo se ejecuta una vez antes de renderizar el componente

    //console.log("Constructor", "Img Value => ", this.img);
  }

  //ngOnChanges(changes: SimpleChanges){
    // Before & during render - Antes y despues de renderizar el componente
    // Changes inputs -- times - Se ejecuta este evento cuando hay cambio en los inputs del componente
    // antes y durante
    //console.log("ngOnChanges", "Img Value => ", this.img);
    //console.log(changes);
  //}

  //ngOnInit(): void{
    /*
    // Before render - Antes de renderizar el componente
    // Async -- one time - aqui se debe colocar promesas, fetch, Consulta de API de un servidor
    // que lleve unos segundos en traer la información
    /*this.countFn = window.setInterval(() => {
      console.log("Hola! - ");
      this.count ++;
    }, 1000)
    */
  //}

  //ngAfterViewInit() {
    // After render - Despues del renderizado, cuando los hijos ya se han renderizado
    // handler children - Aqui se manipula a los hijos del mismo componente, como directivas
    // ejemplo [img], [button], [p]
    //console.log("ngViewAfterInit");
  //}

  //ngOnDestroy() {
    // Se ejecuta cuando se elimina un componente,
    // Ejemplo cuando un *ngif no se cumple, podria quitar un componente
    //console.log("ngOnDestroy");
    //window.clearInterval(this.countFn);
  //}

  imgError(){
    this.img = this.imgDefault;
  }

  imgLoaded(){
    //console.log("Log hijo")
    this.loaded.emit(this.img);
  }

}
