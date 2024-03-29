import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService) { }

  formLogin: FormGroup;
  message: Message;

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
        if (params['nowYouCanLogin']) {
          this.showMessage({
            text: 'Now you can login',
            type: 'success'
          });
        }
    });
    this.formLogin = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });

  }
  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.formLogin.value;
    this.auth.loginUser(formData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate([`/my-projects`]);
      },
      error =>    this.showMessage({
        text: 'Incorrect username or password',
        type: 'danger'
      })
    );
  }
}

