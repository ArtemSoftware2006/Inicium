import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../entities/user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = 'https://test-data.directorix.cloud/task1';

  constructor(private httpClient : HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.httpClient.get<any>(this.url)
    .pipe(
      map((res) => res.users as User[]),
      map(users => users.map(user => ({...user, selected : false})))
    );
  }
}

