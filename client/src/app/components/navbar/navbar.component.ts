import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '../../../shared/app-style.css'
  ]
})

export class NavbarComponent implements OnInit {


  currentUser: User;
  toggleNavbar: boolean;
  authStatus: boolean;
  logoUrl: string;

  constructor( private router: Router,
               private auth: AuthService) {

    if (this.auth.logIn()) {
      this.authStatus = true;
    }
  }

  ngOnInit() {
    this.router.navigate(['/my-projects']);
    this.currentUser = this.auth.currentUser;
    this.logoUrl = '../../assets/images/logo.png';
  }

  clickEvent() {
    this.toggleNavbar = !this.toggleNavbar;
  }

  onSubmit() {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

}
