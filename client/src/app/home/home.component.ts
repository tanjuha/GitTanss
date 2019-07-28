import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/models/user.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  currentUser: User;
  userFromApi: User;

  constructor(private router: Router, private auth: AuthService, private userService: UserService) {
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnInit() {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;
    });
  }

  onSubmit() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
