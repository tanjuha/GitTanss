import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Message} from '../../../models/message.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    './registration.component.css',
    '../../../shared/app-style.css'
  ]
})
export class RegistrationComponent implements OnInit {

  logoUrl: string;
  formRegistration: FormGroup;
  message: Message;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.logoUrl = '../../assets/images/logo.png';
    this.message = new Message('danger', '');
    this.formRegistration = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'username': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
        ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ] )
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  registration() {
    const formData = this.formRegistration.value;
    this.auth.registrationUser(formData)
      .subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowYouCanLogin: true
          }
        });
      },
      () =>  this.showMessage({
        text: 'Not valid params',
        type: 'danger'
      })
  );
  }

}
