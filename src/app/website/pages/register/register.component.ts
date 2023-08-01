import { Component } from '@angular/core';
import { OnExit } from './../../../guards/exit.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  OnExit() {
    const rta = confirm('Logica En el componente, estas seguro salir?');
    return rta;
  }

}
