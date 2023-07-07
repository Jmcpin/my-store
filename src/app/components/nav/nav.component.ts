import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service'; // 5.- Importar el Store Service donde esta el observable
import { AuthService } from '../../services/auth.service';
import { user } from '../../models/user.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  activeMenu = false;
  counter = 0;
  //token = '';
  profile: user = {
    id: 0,
    email: '',
    password: '',
    name: ''
  }

  constructor (
    private storeService: StoreService, // 6.- Declarar en constructor el Store Service donde se encuentra el observable
    private authService: AuthService
    ) {

  }

  ngOnInit(): void {
    this.storeService.myCarNavHeader$.subscribe(products_listt => { // 7.- Este componente Nav ya se suscribio al servicio de store servicio
      this.counter = products_listt.length; // 8.- y se realiza la acción deseada
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('pablo1@hotmail.com','112233')
      .pipe(
        switchMap(() => {
          //this.token = item.access_token;
       //   return this.authService.profile(item.access_token);
          return this.authService.profile();
        })
      )
      .subscribe(rta => {
        this.profile = rta;
        //Aqui ya se obtiene los datos del usuario
        //una vez que ya dio permiso de acceso con el token del usuario

        //this.getProfile();
      });
  }
/*
  login(){
    this.authService.login('pablo1@hotmail.com','112233')
    .subscribe(rta => {
      this.token = rta.access_token;
      console.log(this.token);
      this.getProfile();
    });
  }
*/

//Este era para devolver los datos del usuario una vez obtenidoel token
/*
  getProfile(){
    this.authService.profile(this.token)
    .subscribe(user => {
      this.profile = user
    });
  }
*/
}
