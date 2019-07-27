import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  private getUsersUrl = `${environment.url}/users`;

  getUsers() {
    return this.http.get<any>(this.getUsersUrl);
  }

}
