import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private getUsersUrl = `${environment.url}/users`;
  private getUserByIdUrl = `${environment.url}/user`;

  getUsers() {
    return this.http.get<User[]>(this.getUsersUrl);
  }

  getById(id: number) {
    return this.http.get<User>(`${this.getUserByIdUrl}/${id}`);
  }
}
