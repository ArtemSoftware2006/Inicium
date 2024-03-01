import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, map, tap } from 'rxjs';
import { UsersResponse } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = 'https://test-data.directorix.cloud/task1';

  constructor(private httpClient : HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.httpClient.get<UsersResponse>(this.url)
    .pipe(
      //отобрази полученные данные в консоль
      map(response => response.users.map(user => ({...user, selected : false})))
    );
  }
}

