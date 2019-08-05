import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../auth.component.css']
})
export class RegistrationComponent implements OnInit {

  formRegistration: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.formRegistration = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)] )
    });

  }
  registration() {
    const formData = this.formRegistration.value;
    this.auth.registrationUser(formData).subscribe(
      res => {
        console.log('successfully create user');
        this.router.navigate(['/login'], {
          queryParams: {
            nowYouCanLogin: true
          }
        });
      },
      err => {
        console.log(err);
      }

  );
    console.log(formData);
  }

}
