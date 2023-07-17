import { Component } from '@angular/core';
//import { Product } from './models/product.model';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (
    private usersService: UsersService,
    private authService: AuthService,
    private filesService: FilesService
  ) {

  }

  imgParent = "https://www.w3schools.com/howto/img_avatar.png";

  onLoaded(img: string){
    console.log("Log padre", img);
  }

  showToggle = true;

  token = "";

  imgFile = "";

  toggleCount(){
    this.showToggle = !this.showToggle;
  }

  createUser(){
    this.usersService.create({
      name: "Pablo",
      email: "pablo1@hotmail.com",
      password: "112233",
      role: 'customer',
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  login(){
    this.authService.login("pablo1@hotmail.com","112233")
    .subscribe(rta => {
      console.log(rta.access_token);
      this.token = rta.access_token;
    })
  }

  profile(){
    this.authService.profile()
//  this.authService.profile(this.token)
    .subscribe(rta => {
      console.log("desde el token =>",rta);
    })
  }

  downloadPdf(){
    this.filesService.getFile('archivo.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe(respuesta => {
      console.log("si se pudo ",respuesta);
    })
  }

  onUpdate(event: Event){ // Se recibirá el evento del input file
    const element = event.target as HTMLInputElement; // se convierte en un elemento input para depues saber si tiene file
    const file = element.files?.item(0); // se obtiene el dato si tiene archivos en el input file
    if(file){ // Si existe o hay un archivo en el input file
      this.filesService.setUpload(file)
      .subscribe(rta => {
        this.imgFile = rta.location;
        console.log(rta);
      })
    }
  }

}
