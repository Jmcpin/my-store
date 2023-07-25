import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, createUser } from '../models/user.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private UrlApi = `${environment.API_URL}/api/users`;
  private UrlApiCreateUsers = `${environment.API_URL_CREATE_USERS}/api/users`;

  constructor(
    private httpApii: HttpClient
  ) {

  }

  create(dto: createUser){
    return this.httpApii.post<User>(this.UrlApiCreateUsers,dto);
  }

  getAll(){
    return this.httpApii.get<User[]>(this.UrlApiCreateUsers);
  }

}
