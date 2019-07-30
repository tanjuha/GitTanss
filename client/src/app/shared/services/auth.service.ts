import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  private registerUrl = `${environment.url}/auth/registration`;
  private loginUrl = `${environment.url}/auth/login`;
  private getUserByUsernameUrl = `${environment.url}/user/username`;

  constructor(private http: HttpClient, private router: Router) {}

  jwtHelper = new JwtHelperService();

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
  }

/*  getUserByUsername (username): Observable<any> {
    return this.http.get<any>(`${this.getUserByUsernameUrl}/${username}`).pipe(map(data => {
      return {
        username: data[0].username,
        password: data[0].password
      };
    }));
  }*/

  registrationUser(user) {
     return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  logIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
     localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
