import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, createUser } from '../models/user.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private UrlApi = `${environment.API_URL}/api/users`;

  constructor(
    private httpApii: HttpClient
  ) {

  }

  create(dto: createUser){
    return this.httpApii.post<User>(this.UrlApi,dto);
  }

  getAll(){
    return this.httpApii.get<User[]>(this.UrlApi);
  }

}
