import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private router: Router, private auth: AuthService) { }


  ngOnInit() {
    this.formLogin = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

  }
  onSubmit() {
    if (this.formLogin.invalid) {
      return;
    }
    this.loading = true;
    const formData = this.formLogin.value;
    this.auth.login(formData).pipe(first()).subscribe(
      data => {
        this.router.navigate([`/projects`]);
      },
      error => {
        this.error = error;
        this.loading = false;
      });
}

}

