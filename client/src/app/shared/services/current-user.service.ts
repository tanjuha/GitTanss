import {Injectable, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {User} from '../models/user.model';

@Injectable()
export class CurrentUserService implements OnInit {

  currentUser: User;
  currentUserId: any;

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit() {

    // get current user username from jwt
    this.currentUser = this.auth.decodeToken();

    // get current user id
    this.userService.getUserByUsername(this.currentUser.username).subscribe(data => {
      this.currentUserId = data.map(elem => elem.id);
    });
  }

}
