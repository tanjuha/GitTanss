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
  public currentUserId: any;
  constructor(private http: HttpClient, private router: Router) {
  }

  jwtHelper = new JwtHelperService();

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
  }

  public get currentUserValueId(): User {
    const info = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    return  info.username;
  }

  public get currentUserValue(): User {
    return this.currentUserId;
  }


  registrationUser(user) {
     return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user).pipe(map(project => {
      if (user) {
        this.currentUserId = project['user'][0].id;
      }
      return {
        id: project['user'][0].id,
        username: project['user'][0].username,
        password: project['user'][0].password,
        token: project['token']
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

