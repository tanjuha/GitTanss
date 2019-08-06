import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {User} from '../../models/user.model';
import {environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })

export class AuthService {

  private registerUrl = `${environment.url}/registration`;
  private loginUrl = `${environment.url}/authenticate`;

  constructor(private http: HttpClient,
              private router: Router) { }

  jwtHelper = new JwtHelperService();

   public get currentUser() {
    const token = localStorage.getItem('token');
     return this.jwtHelper.decodeToken(token);
  }

  registrationUser(user) {
     return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user).pipe(map(data => {
      return {
        token: data['token']
      };
    }));
  }

  logIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
     localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}

