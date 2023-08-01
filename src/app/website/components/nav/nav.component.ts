import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from '../../../services/store.service'; // 5.- Importar el Store Service donde esta el observable
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { switchMap } from 'rxjs/operators';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  activeMenu = false;
  private sub$!: Subscription;
  counter = 0;
  //token = '';
  /*profile: User = {
    id: 0,
    email: '',
    password: '',
    name: '',
    role: 'customer',
  };*/
  profile: User | null = null;
  categories: Category[] = [];

  constructor (
    private storeService: StoreService, // 6.- Declarar en constructor el Store Service donde se encuentra el observable
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router : Router
    ) {

  }

  ngOnInit(): void {
    this.sub$ = this.storeService.myCarNavHeader$.subscribe(products_listt => { // 7.- Este componente Nav ya se suscribio al servicio de store servicio
      this.counter = products_listt.length; // 8.- y se realiza la acción deseada
    });
    this.getAllCategories();
    //this.ProfileExist();
    this.authService.user$.subscribe(user => {
      this.profile = user;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('john@mail.com','changeme')
      .pipe(
        switchMap(() => {
          //this.token = item.access_token;
       //   return this.authService.profile(item.access_token);
          return this.authService.profile();
        })
      )
      .subscribe(() => { //.subscribe((rta) => {
        //this.profile = rta; //Se quito porque el estado global ya tiene los dats del usuario
        //Aqui ya se obtiene los datos del usuario
        //una vez que ya dio permiso de acceso con el token del usuario
        this.router.navigate(['/profile']); //cuando inicie sesión, se redireccione a profile
        //this.getProfile();
      });
  }

  ProfileExist(){ // Echo por mi para que cuando se recargara la ruta 'profile' se mantuviera visitble el correo del profile si ya estaba logeado
    //ya no se va a usar porque se usara la reactividad de un estado global
    //Curso de Angular Router: Lazy Loading y Programación Modular - 21 Estado de login
    //https://platzi.com/clases/2487-angular-modular/41203-estado-de-login/
    this.authService.profile().subscribe(data => {
      if(data){
        this.profile = data;
      }
    })
  }

  getAllCategories(){
    this.categoriesService.getAll().subscribe(data => {
      this.categories = data;
    })
  }

  logout(){
    this.authService.logout(); //1- Elimina el Token del localstorage
    this.profile = null; //2- Deja en nulo los datos del profile
    this.router.navigate(['/home']);//3- Va a reedireccionar a la ruta '/home'
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
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
