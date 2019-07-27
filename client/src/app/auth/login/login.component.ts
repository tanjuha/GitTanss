import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  formLogin: FormGroup;

  ngOnInit() {
    this.formLogin = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

  }
  onSubmit() {
    const formData = this.formLogin.value;
    this.auth.loginUser(formData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate([`/projects`]);
        console.log('this is value - ' + formData.username);
      },
      error =>  console.log(error)
    );
}

}
