import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  userOwner: User;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.router.navigate(['/projects']);
    this.userOwner = this.auth.decodeToken();
    console.log('jwt token - ' + this.userOwner.username);
  }

  onSubmit() {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

}
