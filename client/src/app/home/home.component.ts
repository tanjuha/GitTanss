import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {User} from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  toggleNavbar: boolean;
  logoUrl: string;

  constructor(private router: Router, private auth: AuthService) { }

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
