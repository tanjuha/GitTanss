import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-create-form-modal',
  templateUrl: './create-form-modal.component.html',
  styleUrls: ['./create-form-modal.component.css']
})
export class CreateFormModalComponent implements OnInit {

  createForm: FormGroup;
  currentUser: User;
  currentUserInfo: any;

  constructor(
    public activeModal: NgbActiveModal,
    public project: ProjectService,
    public userService: UserService,
    public auth: AuthService) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      'name_project': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
    });

    // get current user username from jwt
    this.currentUser = this.auth.decodeToken();
    console.log('jwt token - ' + this.currentUser.username);

    // get current user id
    this.userService.getUserByUsername(this.currentUser.username).subscribe(data => {
      this.currentUserInfo = data.map(elem => elem.id);
    });

  }

  get form() { return this.createForm.controls; }

  submitForm() {
    this.project.create(this.form.name_project.value, this.form.description.value,  this.currentUserInfo).subscribe(res => {
        console.log('res ' + res);
      },
      err => {
        console.log( 'err ' + err);
      }
    );
  }

}
