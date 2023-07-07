import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user, createUser } from '../models/user.model';
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
    return this.httpApii.post<user>(this.UrlApi,dto);
  }

  getAll(){
    return this.httpApii.get<user[]>(this.UrlApi);
  }

}
