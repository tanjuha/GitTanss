import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private registerUrl = `${environment.url}/auth/registration`;
  private loginUrl = `${environment.url}/auth/login`;


  constructor(private http: HttpClient, private router: Router) {}

  jwtHelper = new JwtHelperService();

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
  }


  registrationUser(user) {
     return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user).pipe(map(data => {
      return {
        id: data['user'][0].id,
        username: data['user'][0].username,
        password: data['user'][0].password,
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

